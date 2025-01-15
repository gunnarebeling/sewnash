using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Threading.Tasks;
using Stripe.Model;
using SewNash.Data;
using SewNash.Models;
namespace sewnash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private SewNashDbContext _dbContext;

        public StripeController(SewNashDbContext dbContext)
        {
           _dbContext = dbContext;
        }

        [HttpPost("create-checkout-session/{classId}")]
        public ActionResult Create(int classId)
        {
            SewClass SewClass = _dbContext.SewClasses.SingleOrDefault(sc => sc.Id == classId);
            if (classId == default)
            {
                return NotFound();
            }
            var domain = "http://localhost:3000";
            var options = new SessionCreateOptions
            {
                UiMode = "embedded",
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    Price = $"{SewClass.PriceId}",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
                AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true },
            };
            var service = new SessionService();
            Stripe.Checkout.Session session = service.Create(options);

            return new JsonResult(new { clientSecret = session.ClientSecret });
        }

        [HttpGet("session-status")]
        public ActionResult SessionStatus([FromQuery] string session_id)
        {
            var sessionService = new SessionService();
            Stripe.Checkout.Session session = sessionService.Get(session_id);

            return new JsonResult(new {status = session.Status,  customer_email = session.CustomerDetails.Email});
        }
    }

    
}
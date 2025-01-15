using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Threading.Tasks;
using Stripe.Model;
namespace sewnash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
   

        public StripeController()
        {
           
        }

        [HttpPost("create-checkout-session")]
        public ActionResult Create()
        {
            var domain = "http://localhost:3000";
            var options = new SessionCreateOptions
            {
                UiMode = "embedded",
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    Price = "{{PRICE_ID}}",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
                AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true },
            };
            var service = new SessionService();
            Session session = service.Create(options);

            return new JsonResult(new { clientSecret = session.ClientSecret });
        }

        [HttpGet("session-status")]
        public ActionResult SessionStatus([FromQuery] string session_id)
        {
            var sessionService = new SessionService();
            Session session = sessionService.Get(session_id);

            return new JsonResult(new {status = session.Status,  customer_email = session.CustomerDetails.Email});
        }
    }

    
}
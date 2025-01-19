using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addingpriceid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SewClasses",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AddColumn<string>(
                name: "PriceId",
                table: "SewClasses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8871824c-6018-4ca6-9fd9-9d44e970fefb", "AQAAAAIAAYagAAAAEJH4XVpzFrnJ//287kZ8NRO3vNJFRIPr5lXaGO2BM77XV5umFNMRkh8PUhhiQEdM3g==", "ae674e8c-02ff-4dcb-b06f-6a3a7f1e3eec" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4475a757-8eb0-45b2-b065-fa59780a9139", "AQAAAAIAAYagAAAAEAxIn2pHQWZ/Lj/wjHUEStfQjnmAuv4kH7RT/iE4hswew5bPqP0i5JskodrCGSP73A==", "693cde68-ae3c-4776-b42d-10d152dba87c" });

            migrationBuilder.UpdateData(
                table: "SewClasses",
                keyColumn: "Id",
                keyValue: 1,
                column: "PriceId",
                value: "prod_RaVxV02HCSlej2");

            migrationBuilder.UpdateData(
                table: "SewClasses",
                keyColumn: "Id",
                keyValue: 2,
                column: "PriceId",
                value: "prod_RaVyiIgmzIyGuB");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "SewClasses");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5188c5c-1fa7-4342-9e61-99205afb83b3", "AQAAAAIAAYagAAAAEBdsXVfosIrYEXOdFH1UHoalr5jxzfB4MJhiWaZhYXIGDTdY/xXUpc1hZL7j7z3deQ==", "953acbbc-9138-4d09-a232-b0ae58bad69e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a46db6e6-01f9-41f0-8b20-966ebcecfc4b", "AQAAAAIAAYagAAAAEAY/ecnZLMqZZF8dbcoCC6o3HqppRyQNxqyHKu3Zlr17VapNGUrbYAWT+5NY64GihQ==", "2e818772-9b15-4dcf-8f54-8f4ede30f2a2" });

            migrationBuilder.InsertData(
                table: "SewClasses",
                columns: new[] { "Id", "Description", "Duration", "MaxPeople", "Name", "PricePerPerson" },
                values: new object[] { 3, "Learn to build a boot stocking .", 2, 10, "boot stocking", 60.00m });
        }
    }
}

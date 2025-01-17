using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addingemailprop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "SewClasses");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Bookings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a41be096-c14d-4caf-895c-f2cddbb909a9", "AQAAAAIAAYagAAAAEAgsoKBiApNc8bjerg5QvH0qsZwWExZ3r+s+0vniNAflAgigtHM7DoK8V+lEEKQ6dA==", "fc23d1ab-b65f-47c2-8a43-40e3aee363ed" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a995700b-78bf-409b-8adf-1303b93b4591", "AQAAAAIAAYagAAAAEKjKVbkdcEL/LKPeM3Rf7t7RltTk1hcGgvS6f1ZvDer1a4pnkxajrFyGnXtKtEXnNg==", "eadc1757-a869-40b3-b7e1-7fd2c3897287" });

            migrationBuilder.UpdateData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Email",
                value: "test@test.com");

            migrationBuilder.UpdateData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Email",
                value: "test2@test.com");

            migrationBuilder.UpdateData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 3,
                column: "Email",
                value: "test3@test.com");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Bookings");

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
    }
}

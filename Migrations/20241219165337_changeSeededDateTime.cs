using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class changeSeededDateTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "28a0ccd2-24a3-439d-a19f-32e5f1ccee6d", "AQAAAAIAAYagAAAAEIHniJfLYF5cd3P6uJqWcTR8qJmdREbMwZSqK8Yzy7txpso2SO3X403x6TUe1zyX6Q==", "0205cffc-cb73-4372-9cf2-8f8b8a2990e0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eb64bfe7-2f52-401b-a1c0-08e1b0663523", "AQAAAAIAAYagAAAAEK279ZlGswCoAZe5ySWTLmoQjKOp96iDw826Du96Td0QGhmgB4K5owO3//s8exxA6A==", "14aa8adb-0643-4c9a-8582-569c3f73af0a" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4ad9d719-dd68-45ca-8a7a-bcd79f19173c", "AQAAAAIAAYagAAAAENamA3K+mUPkZQMHivazwl/yWSNX/Du8qF9+TxksvI05kzvBnQn+c5xzfoSs5sbWsQ==", "a1cc5725-687b-4f08-9d8a-c99b7019155e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fa8540c1-6bc2-46db-b0e0-ed75f40053a1", "AQAAAAIAAYagAAAAEMXbO1q4kMyj+ptQGO8EYJFhPOCPvjUmso0bPFSuiFdm6fcqTMwwBZxFVNPWFxsiRw==", "a00cbde3-af55-4297-96e9-dd69d139d882" });
        }
    }
}

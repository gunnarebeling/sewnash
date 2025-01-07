using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addedMainPhotof : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "11ea2ba8-1df5-4c9b-8ee4-b4494b877c79", "AQAAAAIAAYagAAAAENY9fKGducc74k+eKe4jv9GzgDa49I6izOSsMuG/SROjnqAe7y0l6gaTVJy0tznrRw==", "19122153-a160-4781-aea7-dedebe00a5c3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8ef686cc-34ab-496e-b902-9e3ff5b4f2c7", "AQAAAAIAAYagAAAAEGfc16MVHio06tEQkbfqz6en1pTuwRfhbZSTK9zO9zHD2Wzc+hCxwXWTj5EmqjCJnw==", "97f08218-e2f2-4f5f-a99a-485593d75d0e" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fe497794-945a-4378-b23e-9ad259035a73", "AQAAAAIAAYagAAAAEKRUgdV8A9IxuI8XZ42Ck4quqev+OjkEWJ4QRZPBjVBVEGqlpGUL/v2ixSGXAndL5w==", "42b25746-85ce-42a7-9cf3-6f56aece8cf4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bfd6092d-0584-4efd-a1ce-6cb7016628dc", "AQAAAAIAAYagAAAAEG/q9ozzZNDPl2AivDAb1M90yEHElYDeKVHPlZ4ILsnz6UMS9Ci0E4Ge4yWvvcvhGQ==", "d0b5e75b-2f28-4f05-86cb-2e7d3fd56355" });
        }
    }
}

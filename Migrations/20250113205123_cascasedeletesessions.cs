using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class cascasedeletesessions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cee41d72-fc98-4aed-9dca-ecd06aadf937", "AQAAAAIAAYagAAAAEHXnnKmLQs+oB7uIAGCWqksqyvQchgu0b+XSddXMD9OZFGMYr9mPd1hEmLDOnXRXWg==", "27fa7a1a-3e15-4f72-ad3c-fa888204b013" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6ec07e58-af3f-4aa8-b263-2f43e4d1b085", "AQAAAAIAAYagAAAAEHuFUA8+wDcNqYQVoZ4W+cs041E5+bQs8OC0oTsJeDw/EUxOqnJ6r9zr0BOpdUBvtQ==", "19500fb7-664d-4be4-a0ce-f7d1edfb2186" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e9d1dc10-5d86-4e5b-8073-18f6403b9a5c", "AQAAAAIAAYagAAAAEOnnTzedxQhsTnOEt+BFV/atA3G7jKoMVsOfjQ4Ovv2EfvnpyLhMGSlA4qcde7Pmmg==", "c5398c62-acca-4fbc-8359-8dc55918b0a7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8f8b021c-edff-4f5d-a443-3d9246e6e163", "AQAAAAIAAYagAAAAEJFffOgH7Z8wPT9bP0HsHFxEVvWbwpJS0m/WGfxF23w42QfWKvY0gNserb8VYGE1vA==", "1a279472-b818-42a1-a3b0-c8a891fe14df" });
        }
    }
}

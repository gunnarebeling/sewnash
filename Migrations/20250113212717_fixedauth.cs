using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class fixedauth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Employees",
                type: "text",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                column: "Email",
                value: "admina@strator.comx");

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                column: "Email",
                value: "johndoe@example.com");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Employees");

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
    }
}

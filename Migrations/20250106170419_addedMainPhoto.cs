using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addedMainPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "MainPhoto",
                table: "Photos",
                type: "boolean",
                nullable: false,
                defaultValue: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainPhoto",
                table: "Photos");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1b98fabb-aa97-4e94-a11b-f979a1d316bb", "AQAAAAIAAYagAAAAEK1m/1FjbhoVsp71C+MMWks0M8fVpD3PVy3XRSg1hg74+Vgtqd/xSOi3qmdIsKXeMQ==", "4fbac1ec-8d0c-4c3c-b56b-4e0e17f9b907" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d413c28a-d848-4fe0-8a62-c26601328c33", "AQAAAAIAAYagAAAAEMAfenkmRKc/Zjd7xM03YinbrZoXoe34EGbzzacQYA6OvXNOCEQAblrMhmiyg8VXXg==", "eb04069e-02ed-40af-ac08-3ea4be1c1fb5" });
        }
    }
}

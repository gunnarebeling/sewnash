using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class changeSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a4506506-e7bf-4b3b-aa12-5e91b5400721", "AQAAAAIAAYagAAAAEAG/ps2wAWRku0U6QZwHyYhh/60OWQjNMfaBKOOeTiVXtHmo0kTE+HxlzJ2SA756eg==", "6c807b8a-84a8-43c2-b712-2ac9f0f20c05" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "802bfe8c-84b4-40a3-bcc6-19758db90014", "AQAAAAIAAYagAAAAEKa6Kl3+Dpo+NokPBk29fSBpPqFw6bZHfmRVSRtZkyrXs7vjXC8y6NshH3Boz0VVTg==", "65c366f5-bc08-4801-b0ab-c918923cc0e3" });

            migrationBuilder.UpdateData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTime",
                value: new DateTime(2025, 1, 15, 16, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateTime",
                value: new DateTime(2025, 1, 16, 20, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateTime",
                value: new DateTime(2025, 1, 16, 0, 0, 0, 0, DateTimeKind.Utc));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTime",
                value: new DateTime(2025, 1, 15, 10, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateTime",
                value: new DateTime(2025, 1, 16, 14, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 3,
                column: "DateTime",
                value: new DateTime(2025, 1, 15, 18, 0, 0, 0, DateTimeKind.Local));
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addduration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "SewClasses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.UpdateData(
                table: "SewClasses",
                keyColumn: "Id",
                keyValue: 1,
                column: "Duration",
                value: 2);

            migrationBuilder.UpdateData(
                table: "SewClasses",
                keyColumn: "Id",
                keyValue: 2,
                column: "Duration",
                value: 2);

            migrationBuilder.UpdateData(
                table: "SewClasses",
                keyColumn: "Id",
                keyValue: 3,
                column: "Duration",
                value: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "SewClasses");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c2e76d9e-8a8a-47ef-8e38-beb85701d34e", "AQAAAAIAAYagAAAAEGFHc1gkgtppsKyrmcpq3eCrpiXC0H5+Nc4XciejPpBrPg5qv6qz3LhGY2zsGHSzCQ==", "617f4a8d-8939-4fa6-8b99-f1d235743741" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "475b0720-cb30-47b4-98ea-4ba72e96674f", "AQAAAAIAAYagAAAAEMfNgW8j6yOMk4D+sxevJ/hddP5/qDIo1B+GN7DUzteCJeXL9HIEC8V/S+oBzTwM7Q==", "9e58bf39-b89e-41f6-943d-b59ec42ce032" });
        }
    }
}

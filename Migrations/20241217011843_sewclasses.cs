using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class sewclasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_SewClass_SewClassId",
                table: "Availabilities");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_SewClass_SewClassId",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SewClass",
                table: "SewClass");

            migrationBuilder.RenameTable(
                name: "SewClass",
                newName: "SewClasses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SewClasses",
                table: "SewClasses",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_SewClasses_SewClassId",
                table: "Availabilities",
                column: "SewClassId",
                principalTable: "SewClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_SewClasses_SewClassId",
                table: "Sessions",
                column: "SewClassId",
                principalTable: "SewClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Availabilities_SewClasses_SewClassId",
                table: "Availabilities");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_SewClasses_SewClassId",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SewClasses",
                table: "SewClasses");

            migrationBuilder.RenameTable(
                name: "SewClasses",
                newName: "SewClass");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SewClass",
                table: "SewClass",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7a9f3547-ed04-46ca-bde1-308fbc8716ec", "AQAAAAIAAYagAAAAEAiPSELZMTsk5L5xD5uBqEFHlf7S8ANnPcutbCpdVCjpbvP91bk0WPZsMhr6cCF8+w==", "2de2333b-a4fa-4d00-a795-d84ae90a7691" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c68420f1-5cc4-4c3e-98e9-1bb8f960469c", "AQAAAAIAAYagAAAAEGCdL9CKhWGEYl2CXDfSulEuIgZESC6QevMyuV+ZUrz4CwXVLKtfVBKwbDt6eZ3f6A==", "af09cbcb-b4ac-4991-ae65-d0880df9e5a6" });

            migrationBuilder.AddForeignKey(
                name: "FK_Availabilities_SewClass_SewClassId",
                table: "Availabilities",
                column: "SewClassId",
                principalTable: "SewClass",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_SewClass_SewClassId",
                table: "Sessions",
                column: "SewClassId",
                principalTable: "SewClass",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

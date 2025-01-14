using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addedcascasedelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos",
                column: "SewClassId",
                principalTable: "SewClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos",
                column: "SewClassId",
                principalTable: "SewClasses",
                principalColumn: "Id");
        }
    }
}

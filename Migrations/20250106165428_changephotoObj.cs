using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class changephotoObj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Photos",
                newName: "FileKey");

            migrationBuilder.AlterColumn<int>(
                name: "SewClassId",
                table: "Photos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos",
                column: "SewClassId",
                principalTable: "SewClasses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "FileKey",
                table: "Photos",
                newName: "Url");

            migrationBuilder.AlterColumn<int>(
                name: "SewClassId",
                table: "Photos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dd6360ea-e6e1-4fd3-9caf-6131c7182a03", "AQAAAAIAAYagAAAAEDb6ai6oUlcJFiqjDegNgTI4DTfii86yT//ccVYFTNobE2I/do7j9LMQOfejzLT94Q==", "461e977d-4f17-4686-8694-86e4dd29bcc6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4f8e70df-984e-4e08-8b88-ff599f3d3cde", "AQAAAAIAAYagAAAAEFlMaFAg1I2RET2TBH2h8nJ4iDWWMB3N+T3bOL7mGKTlzHfQ2b4Spwliqfy2rhLtcA==", "879ebbc5-5d8b-43ed-902b-d0e864cad3ec" });

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_SewClasses_SewClassId",
                table: "Photos",
                column: "SewClassId",
                principalTable: "SewClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

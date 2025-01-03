using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace sewnash.Migrations
{
    /// <inheritdoc />
    public partial class addedphotos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false),
                    SewClassId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_SewClasses_SewClassId",
                        column: x => x.SewClassId,
                        principalTable: "SewClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Photos_SewClassId",
                table: "Photos",
                column: "SewClassId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

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
        }
    }
}

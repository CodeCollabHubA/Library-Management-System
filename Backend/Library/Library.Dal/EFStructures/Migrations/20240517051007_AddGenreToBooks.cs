using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class AddGenreToBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Genre",
                schema: "libr",
                table: "Books",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Genre",
                schema: "libr",
                table: "Books");
        }
    }
}

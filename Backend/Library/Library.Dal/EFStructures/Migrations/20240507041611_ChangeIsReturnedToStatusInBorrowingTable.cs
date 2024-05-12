using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class ChangeIsReturnedToStatusInBorrowingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsReturned",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                schema: "libr",
                table: "Borrowings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.AddColumn<bool>(
                name: "IsReturned",
                schema: "libr",
                table: "Borrowings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

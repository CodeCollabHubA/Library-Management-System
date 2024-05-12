using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminReferencesToBorrowingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApprovedById",
                schema: "libr",
                table: "Borrowings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RejectedById",
                schema: "libr",
                table: "Borrowings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReturnedById",
                schema: "libr",
                table: "Borrowings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_ApprovedById",
                schema: "libr",
                table: "Borrowings",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_RejectedById",
                schema: "libr",
                table: "Borrowings",
                column: "RejectedById");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_ReturnedById",
                schema: "libr",
                table: "Borrowings",
                column: "ReturnedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowings_Users_ApprovedById",
                schema: "libr",
                table: "Borrowings",
                column: "ApprovedById",
                principalSchema: "libr",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowings_Users_RejectedById",
                schema: "libr",
                table: "Borrowings",
                column: "RejectedById",
                principalSchema: "libr",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowings_Users_ReturnedById",
                schema: "libr",
                table: "Borrowings",
                column: "ReturnedById",
                principalSchema: "libr",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowings_Users_ApprovedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropForeignKey(
                name: "FK_Borrowings_Users_RejectedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropForeignKey(
                name: "FK_Borrowings_Users_ReturnedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropIndex(
                name: "IX_Borrowings_ApprovedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropIndex(
                name: "IX_Borrowings_RejectedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropIndex(
                name: "IX_Borrowings_ReturnedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropColumn(
                name: "ApprovedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropColumn(
                name: "RejectedById",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropColumn(
                name: "ReturnedById",
                schema: "libr",
                table: "Borrowings");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class ChangeBorrowingSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookBorrowings",
                schema: "libr");

            migrationBuilder.RenameColumn(
                name: "NumberOfCopiesOwned",
                schema: "libr",
                table: "Books",
                newName: "NumberOfTotalCopies");

            migrationBuilder.RenameColumn(
                name: "NumberOfCopiesExist",
                schema: "libr",
                table: "Books",
                newName: "NumberOfAvailableCopies");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 5, 3, 12, 35, 9, 373, DateTimeKind.Local).AddTicks(3075),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 28, 14, 15, 23, 634, DateTimeKind.Local).AddTicks(2162));

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                schema: "libr",
                table: "Borrowings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsReturned",
                schema: "libr",
                table: "Borrowings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_BookId",
                schema: "libr",
                table: "Borrowings",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowings_Books_BookId",
                schema: "libr",
                table: "Borrowings",
                column: "BookId",
                principalSchema: "libr",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowings_Books_BookId",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropIndex(
                name: "IX_Borrowings_BookId",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropColumn(
                name: "BookId",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropColumn(
                name: "IsReturned",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.RenameColumn(
                name: "NumberOfTotalCopies",
                schema: "libr",
                table: "Books",
                newName: "NumberOfCopiesOwned");

            migrationBuilder.RenameColumn(
                name: "NumberOfAvailableCopies",
                schema: "libr",
                table: "Books",
                newName: "NumberOfCopiesExist");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 4, 28, 14, 15, 23, 634, DateTimeKind.Local).AddTicks(2162),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 5, 3, 12, 35, 9, 373, DateTimeKind.Local).AddTicks(3075));

            migrationBuilder.CreateTable(
                name: "BookBorrowings",
                schema: "libr",
                columns: table => new
                {
                    BookId = table.Column<int>(type: "int", nullable: false),
                    BorrowingId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsReturned = table.Column<bool>(type: "bit", nullable: false),
                    TimeStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookBorrowings", x => new { x.BookId, x.BorrowingId });
                    table.ForeignKey(
                        name: "FK_BookBorrowings_Books_BookId",
                        column: x => x.BookId,
                        principalSchema: "libr",
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookBorrowings_Borrowings_BorrowingId",
                        column: x => x.BorrowingId,
                        principalSchema: "libr",
                        principalTable: "Borrowings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookBorrowings_BorrowingId",
                schema: "libr",
                table: "BookBorrowings",
                column: "BorrowingId");
        }
    }
}

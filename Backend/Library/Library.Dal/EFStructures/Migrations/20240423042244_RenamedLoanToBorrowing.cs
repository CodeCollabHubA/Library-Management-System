using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class RenamedLoanToBorrowing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookLoans",
                schema: "libr");

            migrationBuilder.DropTable(
                name: "Loans",
                schema: "libr");

            migrationBuilder.CreateTable(
                name: "Borrowings",
                schema: "libr",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DateOut = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 4, 23, 7, 22, 44, 777, DateTimeKind.Local).AddTicks(2549)),
                    TimeStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Borrowings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Borrowings_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "libr",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookBorrowings",
                schema: "libr",
                columns: table => new
                {
                    BookId = table.Column<int>(type: "int", nullable: false),
                    BorrowingId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_UserId",
                schema: "libr",
                table: "Borrowings",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookBorrowings",
                schema: "libr");

            migrationBuilder.DropTable(
                name: "Borrowings",
                schema: "libr");

            migrationBuilder.CreateTable(
                name: "Loans",
                schema: "libr",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DateOut = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 4, 22, 15, 53, 24, 856, DateTimeKind.Local).AddTicks(6091)),
                    TimeStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Loans_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "libr",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookLoans",
                schema: "libr",
                columns: table => new
                {
                    BookId = table.Column<int>(type: "int", nullable: false),
                    LoanId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookLoans", x => new { x.BookId, x.LoanId });
                    table.ForeignKey(
                        name: "FK_BookLoans_Books_BookId",
                        column: x => x.BookId,
                        principalSchema: "libr",
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookLoans_Loans_LoanId",
                        column: x => x.LoanId,
                        principalSchema: "libr",
                        principalTable: "Loans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookLoans_LoanId",
                schema: "libr",
                table: "BookLoans",
                column: "LoanId");

            migrationBuilder.CreateIndex(
                name: "IX_Loans_UserId",
                schema: "libr",
                table: "Loans",
                column: "UserId");
        }
    }
}

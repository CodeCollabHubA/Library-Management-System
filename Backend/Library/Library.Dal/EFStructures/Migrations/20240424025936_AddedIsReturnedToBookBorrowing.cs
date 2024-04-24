using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class AddedIsReturnedToBookBorrowing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 4, 24, 5, 59, 35, 914, DateTimeKind.Local).AddTicks(7001),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 24, 5, 56, 28, 999, DateTimeKind.Local).AddTicks(1712));

            migrationBuilder.AddColumn<bool>(
                name: "IsReturned",
                schema: "libr",
                table: "BookBorrowings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsReturned",
                schema: "libr",
                table: "BookBorrowings");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 4, 24, 5, 56, 28, 999, DateTimeKind.Local).AddTicks(1712),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 24, 5, 59, 35, 914, DateTimeKind.Local).AddTicks(7001));
        }
    }
}

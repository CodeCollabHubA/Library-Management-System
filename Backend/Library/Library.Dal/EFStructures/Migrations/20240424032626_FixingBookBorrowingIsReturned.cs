using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class FixingBookBorrowingIsReturned : Migration
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
                defaultValue: new DateTime(2024, 4, 24, 6, 26, 26, 792, DateTimeKind.Local).AddTicks(2710),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 24, 5, 59, 35, 914, DateTimeKind.Local).AddTicks(7001));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                oldDefaultValue: new DateTime(2024, 4, 24, 6, 26, 26, 792, DateTimeKind.Local).AddTicks(2710));
        }
    }
}

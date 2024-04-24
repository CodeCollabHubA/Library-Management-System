using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class AddedCreditToUsersAndBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Credit",
                schema: "libr",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 4, 24, 5, 56, 28, 999, DateTimeKind.Local).AddTicks(1712),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 23, 7, 22, 44, 777, DateTimeKind.Local).AddTicks(2549));

            migrationBuilder.AddColumn<int>(
                name: "Credit",
                schema: "libr",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credit",
                schema: "libr",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Credit",
                schema: "libr",
                table: "Books");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 4, 23, 7, 22, 44, 777, DateTimeKind.Local).AddTicks(2549),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 24, 5, 56, 28, 999, DateTimeKind.Local).AddTicks(1712));
        }
    }
}

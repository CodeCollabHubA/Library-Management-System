using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUsersEmailAsIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "libr",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Loans",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 3, 29, 16, 16, 58, 968, DateTimeKind.Local).AddTicks(1996),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 3, 29, 15, 41, 10, 174, DateTimeKind.Local).AddTicks(821));

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                schema: "libr",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                schema: "libr",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "libr",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Loans",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 3, 29, 15, 41, 10, 174, DateTimeKind.Local).AddTicks(821),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 3, 29, 16, 16, 58, 968, DateTimeKind.Local).AddTicks(1996));
        }
    }
}

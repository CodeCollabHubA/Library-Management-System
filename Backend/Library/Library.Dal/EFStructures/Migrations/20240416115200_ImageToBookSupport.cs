using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class ImageToBookSupport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Loans",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 4, 16, 14, 52, 0, 80, DateTimeKind.Local).AddTicks(3351),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 3, 29, 16, 16, 58, 968, DateTimeKind.Local).AddTicks(1996));

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                schema: "libr",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                schema: "libr",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                schema: "libr",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                schema: "libr",
                table: "Books");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOut",
                schema: "libr",
                table: "Loans",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 3, 29, 16, 16, 58, 968, DateTimeKind.Local).AddTicks(1996),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 16, 14, 52, 0, 80, DateTimeKind.Local).AddTicks(3351));
        }
    }
}

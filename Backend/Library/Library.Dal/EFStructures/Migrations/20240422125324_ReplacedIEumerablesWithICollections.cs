using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class ReplacedIEumerablesWithICollections : Migration
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
                defaultValue: new DateTime(2024, 4, 22, 15, 53, 24, 856, DateTimeKind.Local).AddTicks(6091),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 4, 16, 14, 52, 0, 80, DateTimeKind.Local).AddTicks(3351));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                oldDefaultValue: new DateTime(2024, 4, 22, 15, 53, 24, 856, DateTimeKind.Local).AddTicks(6091));
        }
    }
}

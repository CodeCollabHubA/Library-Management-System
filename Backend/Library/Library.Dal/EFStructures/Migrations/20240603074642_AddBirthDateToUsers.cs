using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class AddBirthDateToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                schema: "libr",
                table: "Users",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                schema: "libr",
                table: "Users");
        }
    }
}

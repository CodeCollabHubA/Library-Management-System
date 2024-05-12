using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtToBooksAndUsersAndBorrowings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "libr",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GetDate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "libr",
                table: "Borrowings",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GetDate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "libr",
                table: "Books",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GetDate()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "libr",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "libr",
                table: "Borrowings");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "libr",
                table: "Books");
        }
    }
}

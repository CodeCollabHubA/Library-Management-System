﻿// <auto-generated />
using System;
using Library.Dal.EFStructures;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Library.Dal.EFStructures.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240422125324_ReplacedIEumerablesWithICollections")]
    partial class ReplacedIEumerablesWithICollections
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("libr")
                .HasAnnotation("ProductVersion", "7.0.17")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Library.Models.Entities.Author", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.HasKey("Id");

                    b.ToTable("Authors", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfCopiesExist")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfCopiesOwned")
                        .HasColumnType("int");

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Books", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.BookAuthor", b =>
                {
                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<int?>("AuthorId")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.HasKey("BookId", "AuthorId");

                    b.HasIndex("AuthorId");

                    b.ToTable("BookAuthors", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.BookLoan", b =>
                {
                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<int?>("LoanId")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.HasKey("BookId", "LoanId");

                    b.HasIndex("LoanId");

                    b.ToTable("BookLoans", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.BookPublisher", b =>
                {
                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<int?>("PublisherId")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.HasKey("BookId", "PublisherId");

                    b.HasIndex("PublisherId");

                    b.ToTable("BookPublishers", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.Loan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateOut")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValue(new DateTime(2024, 4, 22, 15, 53, 24, 856, DateTimeKind.Local).AddTicks(6091));

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<int?>("UserId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Loans", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.Publisher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.HasKey("Id");

                    b.ToTable("Publishers", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.SeriLogEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ActionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ApplicationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Exception")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Level")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<int>("LineNumber")
                        .HasColumnType("int");

                    b.Property<string>("LogEvent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MachineName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MemberName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MessageTemplate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Properties")
                        .IsRequired()
                        .HasColumnType("Xml");

                    b.Property<string>("RequestPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SourceContext")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeStamp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetDate()");

                    b.HasKey("Id");

                    b.ToTable("SeriLogs", "Logging");
                });

            modelBuilder.Entity("Library.Models.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<int>("UserRole")
                        .HasColumnType("int")
                        .HasColumnName("Role");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users", "libr");
                });

            modelBuilder.Entity("Library.Models.Entities.BookAuthor", b =>
                {
                    b.HasOne("Library.Models.Entities.Author", "AuthorNavigation")
                        .WithMany("BookAuthors")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Library.Models.Entities.Book", "BookNavigation")
                        .WithMany("BookAuthors")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AuthorNavigation");

                    b.Navigation("BookNavigation");
                });

            modelBuilder.Entity("Library.Models.Entities.BookLoan", b =>
                {
                    b.HasOne("Library.Models.Entities.Book", "BookNavigation")
                        .WithMany("BookLoans")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Library.Models.Entities.Loan", "LoanNavigation")
                        .WithMany("BookLoans")
                        .HasForeignKey("LoanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookNavigation");

                    b.Navigation("LoanNavigation");
                });

            modelBuilder.Entity("Library.Models.Entities.BookPublisher", b =>
                {
                    b.HasOne("Library.Models.Entities.Book", "BookNavigation")
                        .WithMany("BookPublishers")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Library.Models.Entities.Publisher", "PublisherNavigation")
                        .WithMany("BookPublishers")
                        .HasForeignKey("PublisherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookNavigation");

                    b.Navigation("PublisherNavigation");
                });

            modelBuilder.Entity("Library.Models.Entities.Loan", b =>
                {
                    b.HasOne("Library.Models.Entities.User", "UserNavigation")
                        .WithMany("Loans")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserNavigation");
                });

            modelBuilder.Entity("Library.Models.Entities.Author", b =>
                {
                    b.Navigation("BookAuthors");
                });

            modelBuilder.Entity("Library.Models.Entities.Book", b =>
                {
                    b.Navigation("BookAuthors");

                    b.Navigation("BookLoans");

                    b.Navigation("BookPublishers");
                });

            modelBuilder.Entity("Library.Models.Entities.Loan", b =>
                {
                    b.Navigation("BookLoans");
                });

            modelBuilder.Entity("Library.Models.Entities.Publisher", b =>
                {
                    b.Navigation("BookPublishers");
                });

            modelBuilder.Entity("Library.Models.Entities.User", b =>
                {
                    b.Navigation("Loans");
                });
#pragma warning restore 612, 618
        }
    }
}

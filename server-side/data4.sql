USE [master]
GO
/****** Object:  Database [FinalProjectDbV7]    Script Date: 29/05/2024 11:02:02 ******/
CREATE DATABASE [FinalProjectDbV7]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FinalProjectDbV7', FILENAME = N'C:\Users\landa\FinalProjectDbV7.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FinalProjectDbV7_log', FILENAME = N'C:\Users\landa\FinalProjectDbV7_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [FinalProjectDbV7] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FinalProjectDbV7].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FinalProjectDbV7] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET ARITHABORT OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [FinalProjectDbV7] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FinalProjectDbV7] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FinalProjectDbV7] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET  ENABLE_BROKER 
GO
ALTER DATABASE [FinalProjectDbV7] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FinalProjectDbV7] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [FinalProjectDbV7] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FinalProjectDbV7] SET  MULTI_USER 
GO
ALTER DATABASE [FinalProjectDbV7] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FinalProjectDbV7] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FinalProjectDbV7] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FinalProjectDbV7] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FinalProjectDbV7] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FinalProjectDbV7] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [FinalProjectDbV7] SET QUERY_STORE = OFF
GO
USE [FinalProjectDbV7]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 29/05/2024 11:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 29/05/2024 11:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParentCategoryId] [int] NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryTrack]    Script Date: 29/05/2024 11:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoryTrack](
	[CategoriesId] [int] NOT NULL,
	[TracksId] [int] NOT NULL,
 CONSTRAINT [PK_CategoryTrack] PRIMARY KEY CLUSTERED 
(
	[CategoriesId] ASC,
	[TracksId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Context] [nvarchar](max) NOT NULL,
	[PostDate] [datetime2](7) NOT NULL,
	[TrackId] [int] NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Companies]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Companies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DayParts]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DayParts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_DayParts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experience]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experience](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Experience] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Levels]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Levels](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Levels] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Statuses]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Statuses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Statuses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stops]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stops](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[X] [float] NOT NULL,
	[Y] [float] NOT NULL,
	[TrackId] [int] NOT NULL,
 CONSTRAINT [PK_Stops] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tracks]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tracks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StartX] [float] NOT NULL,
	[StartY] [float] NOT NULL,
	[EndX] [float] NOT NULL,
	[EndY] [float] NOT NULL,
	[Picture] [nvarchar](max) NOT NULL,
	[Length] [int] NOT NULL,
	[ViewId] [int] NOT NULL,
	[DayPartId] [int] NOT NULL,
	[LevelId] [int] NOT NULL,
	[CompanyForTripId] [int] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Tracks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserFavoriteTracks]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserFavoriteTracks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TrackId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_UserFavoriteTracks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Mail] [nvarchar](max) NOT NULL,
	[AdressX] [float] NOT NULL,
	[AdressY] [float] NOT NULL,
	[BirthDate] [datetime2](7) NOT NULL,
	[StatusId] [int] NOT NULL,
	[ExperienceId] [int] NOT NULL,
	[ProfilePicture] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Views]    Script Date: 29/05/2024 11:02:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Views](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Views] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240416160333_init', N'7.0.14')
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (2, 21, N'nature')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (3, 21, N'city')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (4, 21, N'atraction')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (5, 2, N'field')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (6, 2, N'forest')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (7, 3, N'market')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (8, 3, N'museum')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (9, 4, N'luna park')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (10, 9, N'roller coaster')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (11, 2, N'water')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (12, 11, N'sea')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (13, 11, N'lake')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (14, 11, N'pool')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (15, 4, N'vehicle')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (16, 15, N'car')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (17, 15, N'bike')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (18, 15, N'carting')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (19, 5, N'flower')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (20, 6, N'tree')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (21, NULL, N'trip')
INSERT [dbo].[Categories] ([Id], [ParentCategoryId], [Description]) VALUES (22, 4, N'airplane')
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (3, 1)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (2, 3)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (3, 3)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (3, 5)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (2, 8)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (3, 9)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (2, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (11, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (12, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (13, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (16, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (19, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (20, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (21, 10)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (2, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (13, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (14, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (16, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (17, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (19, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (20, 12)
INSERT [dbo].[CategoryTrack] ([CategoriesId], [TracksId]) VALUES (21, 12)
GO
SET IDENTITY_INSERT [dbo].[Comments] ON 

INSERT [dbo].[Comments] ([Id], [Context], [PostDate], [TrackId]) VALUES (1, N'very nice', CAST(N'2024-04-16T18:20:32.6640000' AS DateTime2), 1)
INSERT [dbo].[Comments] ([Id], [Context], [PostDate], [TrackId]) VALUES (3, N'very nice', CAST(N'2024-05-19T15:59:42.9800000' AS DateTime2), 3)
INSERT [dbo].[Comments] ([Id], [Context], [PostDate], [TrackId]) VALUES (4, N'very pretty', CAST(N'2024-05-19T16:00:56.7530000' AS DateTime2), 3)
SET IDENTITY_INSERT [dbo].[Comments] OFF
GO
SET IDENTITY_INSERT [dbo].[Companies] ON 

INSERT [dbo].[Companies] ([Id], [Description]) VALUES (1, N'alone')
INSERT [dbo].[Companies] ([Id], [Description]) VALUES (2, N'with friends')
INSERT [dbo].[Companies] ([Id], [Description]) VALUES (3, N'with coleagues')
INSERT [dbo].[Companies] ([Id], [Description]) VALUES (4, N'with family')
INSERT [dbo].[Companies] ([Id], [Description]) VALUES (5, N'with children')
SET IDENTITY_INSERT [dbo].[Companies] OFF
GO
SET IDENTITY_INSERT [dbo].[DayParts] ON 

INSERT [dbo].[DayParts] ([Id], [Description]) VALUES (1, N'morning')
INSERT [dbo].[DayParts] ([Id], [Description]) VALUES (2, N'noon')
INSERT [dbo].[DayParts] ([Id], [Description]) VALUES (3, N'afternoon')
INSERT [dbo].[DayParts] ([Id], [Description]) VALUES (4, N'evening')
INSERT [dbo].[DayParts] ([Id], [Description]) VALUES (5, N'night')
SET IDENTITY_INSERT [dbo].[DayParts] OFF
GO
SET IDENTITY_INSERT [dbo].[Experience] ON 

INSERT [dbo].[Experience] ([Id], [Description]) VALUES (1, N'junior')
INSERT [dbo].[Experience] ([Id], [Description]) VALUES (2, N'not bad')
INSERT [dbo].[Experience] ([Id], [Description]) VALUES (3, N'pretty good')
INSERT [dbo].[Experience] ([Id], [Description]) VALUES (4, N'very good')
INSERT [dbo].[Experience] ([Id], [Description]) VALUES (5, N'an expert')
SET IDENTITY_INSERT [dbo].[Experience] OFF
GO
SET IDENTITY_INSERT [dbo].[Levels] ON 

INSERT [dbo].[Levels] ([Id], [Description]) VALUES (1, N'easy')
INSERT [dbo].[Levels] ([Id], [Description]) VALUES (2, N'medium')
INSERT [dbo].[Levels] ([Id], [Description]) VALUES (3, N'hard')
INSERT [dbo].[Levels] ([Id], [Description]) VALUES (4, N'extreme')
SET IDENTITY_INSERT [dbo].[Levels] OFF
GO
SET IDENTITY_INSERT [dbo].[Statuses] ON 

INSERT [dbo].[Statuses] ([Id], [Description]) VALUES (1, N'single')
INSERT [dbo].[Statuses] ([Id], [Description]) VALUES (2, N'married')
INSERT [dbo].[Statuses] ([Id], [Description]) VALUES (3, N'has children')
SET IDENTITY_INSERT [dbo].[Statuses] OFF
GO
SET IDENTITY_INSERT [dbo].[Stops] ON 

INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (8, 32.359341757663273, 34.879120510366086, 3)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (9, 32.073524893294362, 34.835276252639758, 3)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (10, 32.040433988515552, 34.555886632812488, 1)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (11, 31.723251396930877, 34.457009679687488, 1)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (12, 32.571077719520467, 35.001208767927508, 4)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (13, 32.571077719520467, 34.951770291365008, 4)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (14, 32.774102480717012, 35.036538488281238, 5)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (15, 32.732524341582241, 35.025552160156238, 5)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (16, 32.561124769393608, 34.980036112819676, 6)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (17, 32.572119719147679, 34.971796366725926, 6)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (18, 32.433800597446542, 34.923271670000268, 7)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (19, 32.541298440236964, 34.923271670000268, 7)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (20, 32.769483646075578, 34.973367101562488, 8)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (21, 32.769483646075578, 35.171121007812488, 8)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (22, 31.651734983667982, 34.886849767578113, 9)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (23, 31.617464725747379, 34.658650000306409, 10)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (24, 31.569504946897229, 34.691608984681409, 10)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (25, 31.640979388312772, 34.88890970410155, 11)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (26, 31.136417968110241, 34.863503820312488, 12)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (27, 32.296642228449805, 34.853890783203113, 13)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (28, 32.074444924724958, 34.837255722892749, 14)
INSERT [dbo].[Stops] ([Id], [X], [Y], [TrackId]) VALUES (29, 32.074268555761442, 34.83549619377898, 14)
SET IDENTITY_INSERT [dbo].[Stops] OFF
GO
SET IDENTITY_INSERT [dbo].[Tracks] ON 

INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (1, 32.073784903109384, 34.8360219067459, 31.713905979370097, 35.061257726562488, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/blob', 24, 2, 1, 1, 2, N'a flight in the sky of the earth', N'a flight over the sea', CAST(N'2024-04-16T00:00:00.0000000' AS DateTime2), 7)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (3, 32.812883793958882, 35.063131769116389, 32.362096786546914, 34.870365780141476, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/blob', 48, 1, 2, 2, 1, N'an airplane view', N'a flight over the land', CAST(N'2024-05-19T00:00:00.0000000' AS DateTime2), 12)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (4, 32.501612511170713, 34.918811306990008, 32.630080880960023, 34.966876492536883, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/20230315_082020.jpg', 24, 5, 5, 4, 5, N'market tour', N'tour the wanderfull markets by car', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (5, 32.737145093250895, 34.981606847656238, 32.338886718254535, 34.888223058593738, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/20230316_104346.jpg', 72, 4, 4, 3, 4, N'city tour', N'walk along the streets of london by bus', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (6, 32.4673236555689, 34.982782694850926, 32.549549682338323, 34.908624980007176, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/20230315_153514.jpg', 27, 3, 3, 2, 3, N'air tour', N'tour the sky of earth by an airplane', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (7, 32.563523329411289, 34.969963564531518, 32.767918583889596, 34.964470400469018, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/20230315_115709.jpg', 24, 2, 2, 1, 2, N'allstar!', N'come and be a star! watch the wanders of allstar shoes!', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (8, 32.70479480165644, 35.006326085937488, 32.584533902788912, 35.061257726562488, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/20230315_115232.jpg', 24, 1, 1, 1, 1, N'parfume tour', N'come and experience the wanders of the parfume sense on a liquid flower tour', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (9, 31.602623232618679, 34.796212560546863, 31.576887686013308, 34.853890783203113, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/logo512.png', 24, 4, 1, 1, 1, N'sicence tour', N'a sicentific tour to the museum', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (10, 31.715646615791105, 34.767139990540784, 31.587054071569323, 34.745167334290784, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/desert1.webp', 24, 3, 4, 3, 3, N'desert tour', N'come and see the wander of the sand in the desert of the Negev', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (11, 31.792845075441953, 34.791406041992175, 31.644486784104124, 34.640344030273425, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/city1.jpg', 24, 4, 1, 4, 5, N'buildings tour', N'come and see the amaizingness of building in our city', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (12, 30.778408643608785, 35.083230382812488, 30.914233199915348, 34.852517492187488, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/forest3.jpg', 100, 1, 1, 3, 1, N'nature tour', N'come and breath in the sense of the ancient woods', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (13, 31.599816062126159, 34.812692052734363, 31.7891098299361, 34.656136876953113, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/family2.jpg', 34, 4, 5, 1, 4, N'family tour', N'come with your parents to this lovely outdoor trip', CAST(N'2024-05-22T00:00:00.0000000' AS DateTime2), 13)
INSERT [dbo].[Tracks] ([Id], [StartX], [StartY], [EndX], [EndY], [Picture], [Length], [ViewId], [DayPartId], [LevelId], [CompanyForTripId], [Title], [Description], [Created], [UserId]) VALUES (14, 32.073486709928893, 34.83598972023772, 32.074975847757706, 34.834605700386035, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/family1.png', 12, 4, 1, 1, 4, N'family track', N'a track for your lovely family to enjoy yourselves', CAST(N'2024-05-25T00:00:00.0000000' AS DateTime2), 7)
SET IDENTITY_INSERT [dbo].[Tracks] OFF
GO
SET IDENTITY_INSERT [dbo].[UserFavoriteTracks] ON 

INSERT [dbo].[UserFavoriteTracks] ([Id], [TrackId], [UserId]) VALUES (1, 1, 7)
INSERT [dbo].[UserFavoriteTracks] ([Id], [TrackId], [UserId]) VALUES (7, 8, 14)
INSERT [dbo].[UserFavoriteTracks] ([Id], [TrackId], [UserId]) VALUES (6, 12, 14)
SET IDENTITY_INSERT [dbo].[UserFavoriteTracks] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (7, N'yossef', N'landau11@gmail.com', 32.073619556035432, 34.835671073675783, CAST(N'2024-04-29T00:00:00.0000000' AS DateTime2), 2, 4, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/blob')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (8, N'yossef', N'y11@gmail.com', 0, 0, CAST(N'2024-04-08T00:00:00.0000000' AS DateTime2), 2, 3, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/IMG_1031.JPG')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (9, N'try1', N'try1@gmail.com', 32.073303179742027, 34.836020833469391, CAST(N'2024-04-21T00:00:00.0000000' AS DateTime2), 2, 1, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/blob')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (10, N'watermelon', N'watermalon@gmail.com', 32.074805275543241, 34.836068040609987, CAST(N'2024-04-04T00:00:00.0000000' AS DateTime2), 3, 5, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/IMG_1079.JPG')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (11, N'flower', N'flower@gmail.com', 32.073290679289912, 34.836282617331179, CAST(N'2024-04-10T00:00:00.0000000' AS DateTime2), 2, 5, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/IMG_1071.JPG')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (12, N'noa2', N'noa@gmail.com', 32.073907066562995, 34.836250430823, CAST(N'2024-05-16T00:00:00.0000000' AS DateTime2), 3, 5, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/blob')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (13, N'aaa', N'aaa@gmail.com', 32.074467084459393, 34.836074477649689, CAST(N'2024-04-30T00:00:00.0000000' AS DateTime2), 3, 5, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/Screenshot_20230731-092247_Google.jpg')
INSERT [dbo].[Users] ([Id], [Name], [Mail], [AdressX], [AdressY], [BirthDate], [StatusId], [ExperienceId], [ProfilePicture]) VALUES (14, N'aaa', N'a@gmail.com', 32.080760607118187, 34.828044133354076, CAST(N'2024-05-09T00:00:00.0000000' AS DateTime2), 1, 5, N'D:\לימודים\תכנות\תכנות יד\C#++\שב\FinalProject\versions\version7\MyProject.WebApi\MyProject.WebApi\Images/coffee.jpg')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[Views] ON 

INSERT [dbo].[Views] ([Id], [Description]) VALUES (1, N'forest')
INSERT [dbo].[Views] ([Id], [Description]) VALUES (2, N'sea')
INSERT [dbo].[Views] ([Id], [Description]) VALUES (3, N'desert')
INSERT [dbo].[Views] ([Id], [Description]) VALUES (4, N'city')
INSERT [dbo].[Views] ([Id], [Description]) VALUES (5, N'market')
SET IDENTITY_INSERT [dbo].[Views] OFF
GO
/****** Object:  Index [IX_Categories_ParentCategoryId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Categories_ParentCategoryId] ON [dbo].[Categories]
(
	[ParentCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_CategoryTrack_TracksId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_CategoryTrack_TracksId] ON [dbo].[CategoryTrack]
(
	[TracksId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Comments_TrackId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Comments_TrackId] ON [dbo].[Comments]
(
	[TrackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stops_TrackId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Stops_TrackId] ON [dbo].[Stops]
(
	[TrackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tracks_CompanyForTripId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Tracks_CompanyForTripId] ON [dbo].[Tracks]
(
	[CompanyForTripId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tracks_DayPartId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Tracks_DayPartId] ON [dbo].[Tracks]
(
	[DayPartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tracks_LevelId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Tracks_LevelId] ON [dbo].[Tracks]
(
	[LevelId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tracks_UserId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Tracks_UserId] ON [dbo].[Tracks]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tracks_ViewId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Tracks_ViewId] ON [dbo].[Tracks]
(
	[ViewId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_UserFavoriteTracks_TrackId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_UserFavoriteTracks_TrackId] ON [dbo].[UserFavoriteTracks]
(
	[TrackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_UserFavoriteTracks_UserId_TrackId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_UserFavoriteTracks_UserId_TrackId] ON [dbo].[UserFavoriteTracks]
(
	[UserId] ASC,
	[TrackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_ExperienceId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Users_ExperienceId] ON [dbo].[Users]
(
	[ExperienceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_StatusId]    Script Date: 29/05/2024 11:02:03 ******/
CREATE NONCLUSTERED INDEX [IX_Users_StatusId] ON [dbo].[Users]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_Categories_ParentCategoryId] FOREIGN KEY([ParentCategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Categories] CHECK CONSTRAINT [FK_Categories_Categories_ParentCategoryId]
GO
ALTER TABLE [dbo].[CategoryTrack]  WITH CHECK ADD  CONSTRAINT [FK_CategoryTrack_Categories_CategoriesId] FOREIGN KEY([CategoriesId])
REFERENCES [dbo].[Categories] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CategoryTrack] CHECK CONSTRAINT [FK_CategoryTrack_Categories_CategoriesId]
GO
ALTER TABLE [dbo].[CategoryTrack]  WITH CHECK ADD  CONSTRAINT [FK_CategoryTrack_Tracks_TracksId] FOREIGN KEY([TracksId])
REFERENCES [dbo].[Tracks] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CategoryTrack] CHECK CONSTRAINT [FK_CategoryTrack_Tracks_TracksId]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Tracks_TrackId] FOREIGN KEY([TrackId])
REFERENCES [dbo].[Tracks] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Tracks_TrackId]
GO
ALTER TABLE [dbo].[Stops]  WITH CHECK ADD  CONSTRAINT [FK_Stops_Tracks_TrackId] FOREIGN KEY([TrackId])
REFERENCES [dbo].[Tracks] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Stops] CHECK CONSTRAINT [FK_Stops_Tracks_TrackId]
GO
ALTER TABLE [dbo].[Tracks]  WITH CHECK ADD  CONSTRAINT [FK_Tracks_Companies_CompanyForTripId] FOREIGN KEY([CompanyForTripId])
REFERENCES [dbo].[Companies] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tracks] CHECK CONSTRAINT [FK_Tracks_Companies_CompanyForTripId]
GO
ALTER TABLE [dbo].[Tracks]  WITH CHECK ADD  CONSTRAINT [FK_Tracks_DayParts_DayPartId] FOREIGN KEY([DayPartId])
REFERENCES [dbo].[DayParts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tracks] CHECK CONSTRAINT [FK_Tracks_DayParts_DayPartId]
GO
ALTER TABLE [dbo].[Tracks]  WITH CHECK ADD  CONSTRAINT [FK_Tracks_Levels_LevelId] FOREIGN KEY([LevelId])
REFERENCES [dbo].[Levels] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tracks] CHECK CONSTRAINT [FK_Tracks_Levels_LevelId]
GO
ALTER TABLE [dbo].[Tracks]  WITH CHECK ADD  CONSTRAINT [FK_Tracks_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Tracks] CHECK CONSTRAINT [FK_Tracks_Users_UserId]
GO
ALTER TABLE [dbo].[Tracks]  WITH CHECK ADD  CONSTRAINT [FK_Tracks_Views_ViewId] FOREIGN KEY([ViewId])
REFERENCES [dbo].[Views] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tracks] CHECK CONSTRAINT [FK_Tracks_Views_ViewId]
GO
ALTER TABLE [dbo].[UserFavoriteTracks]  WITH CHECK ADD  CONSTRAINT [FK_UserFavoriteTracks_Tracks_TrackId] FOREIGN KEY([TrackId])
REFERENCES [dbo].[Tracks] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserFavoriteTracks] CHECK CONSTRAINT [FK_UserFavoriteTracks_Tracks_TrackId]
GO
ALTER TABLE [dbo].[UserFavoriteTracks]  WITH CHECK ADD  CONSTRAINT [FK_UserFavoriteTracks_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserFavoriteTracks] CHECK CONSTRAINT [FK_UserFavoriteTracks_Users_UserId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Experience_ExperienceId] FOREIGN KEY([ExperienceId])
REFERENCES [dbo].[Experience] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Experience_ExperienceId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Statuses_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Statuses] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Statuses_StatusId]
GO
USE [master]
GO
ALTER DATABASE [FinalProjectDbV7] SET  READ_WRITE 
GO

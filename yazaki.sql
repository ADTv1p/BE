-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 14, 2025 lúc 05:54 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `yazaki`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accessories`
--

CREATE TABLE `accessories` (
  `accessory_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'Tên phụ kiện',
  `type` varchar(50) DEFAULT NULL COMMENT 'Loại phân nhóm (ống, băng keo, kẹp...)',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `accessories`
--

INSERT INTO `accessories` (`accessory_id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Băng keo đen (khổ nhỏ)', 'Nhựa dẻo', '2025-09-12 03:52:36', '2025-09-12 04:51:35'),
(2, 'Băng keo đen (khổ to)', 'Nhựa dẻo', '2025-09-12 04:47:48', '2025-09-12 04:51:44'),
(3, 'Gá', 'Nhựa cứng', '2025-09-12 04:50:42', '2025-09-12 04:53:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `errors`
--

CREATE TABLE `errors` (
  `error_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'Tên lỗi',
  `description` text DEFAULT NULL COMMENT 'Mô tả chi tiết'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `positions`
--

CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL COMMENT 'Mã hiệu vị trí',
  `role` varchar(100) NOT NULL COMMENT 'Vai trò người thao tác',
  `tools` varchar(255) DEFAULT NULL COMMENT 'Công cụ làm việc (ngăn cách bằng dấu phẩy)',
  `process_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `positions`
--

INSERT INTO `positions` (`position_id`, `code`, `role`, `tools`, `process_id`) VALUES
(1, 'a', 'a', 'keo', 1),
(2, 'Tape1', 'tape', 'dao', 1),
(3, 'Tape2', 'tape', 'dao', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `processes`
--

CREATE TABLE `processes` (
  `process_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'Tên quy trình (VD: Quy trình quấn dây điện)',
  `description` text DEFAULT NULL COMMENT 'Mô tả quy trình',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `processes`
--

INSERT INTO `processes` (`process_id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'a', 'a', '2025-09-13 05:58:36', '2025-09-13 05:58:36'),
(2, 'b', 'b', '2025-09-13 06:00:01', '2025-09-13 06:00:01'),
(3, 'c', 'c', '2025-09-13 12:39:37', '2025-09-13 12:39:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `process_steps`
--

CREATE TABLE `process_steps` (
  `process_step_id` int(11) NOT NULL,
  `process_id` int(11) NOT NULL COMMENT 'Tham chiếu tới quy trình',
  `step_order` int(11) NOT NULL COMMENT 'Thứ tự bước trong quy trình',
  `step_name` varchar(100) NOT NULL COMMENT 'Tên bước thao tác',
  `instruction` text DEFAULT NULL COMMENT 'Hướng dẫn chi tiết',
  `tool_required` varchar(255) DEFAULT NULL COMMENT 'Công cụ cần thiết (dao, kéo, súng gió, mỏ vịt,...)',
  `accessories_used` varchar(255) DEFAULT NULL COMMENT 'Phụ kiện sử dụng (VD: băng keo đen lớn, dây rút...)',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `accessory_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `process_steps`
--

INSERT INTO `process_steps` (`process_step_id`, `process_id`, `step_order`, `step_name`, `instruction`, `tool_required`, `accessories_used`, `createdAt`, `updatedAt`, `accessory_id`) VALUES
(2, 1, 1, '1', '1', 'dao', '', '2025-09-13 07:16:16', '2025-09-13 07:16:16', 2),
(3, 1, 2, '2', '2', 'dao', '', '2025-09-13 07:17:21', '2025-09-13 07:17:21', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staffs`
--

CREATE TABLE `staffs` (
  `staff_id` int(11) NOT NULL COMMENT 'ID duy nhất',
  `full_name` varchar(100) NOT NULL COMMENT 'Họ và tên nhân sự',
  `email` varchar(100) DEFAULT NULL COMMENT 'Email (nếu có)',
  `phone` varchar(15) DEFAULT NULL COMMENT 'Số điện thoại',
  `position_id` int(11) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL COMMENT 'Phòng ban',
  `date_of_birth` date DEFAULT NULL COMMENT 'Ngày sinh',
  `start_date` date NOT NULL DEFAULT curdate() COMMENT 'Ngày bắt đầu làm việc',
  `status` enum('active','inactive','resigned','suspended') NOT NULL DEFAULT 'active' COMMENT 'Trạng thái làm việc',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Thời gian tạo',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Thời gian cập nhật',
  `avatar` varchar(255) DEFAULT NULL COMMENT 'Ảnh đại diện nhân sự'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL COMMENT 'ID duy nhất, tự động tăng',
  `email` varchar(100) NOT NULL COMMENT 'Email, không trùng lặp',
  `password` varchar(255) NOT NULL COMMENT 'Mật khẩu (đã mã hóa, nên dùng độ dài lớn)',
  `name` varchar(100) DEFAULT NULL COMMENT 'Họ và tên',
  `date_of_birth` date DEFAULT NULL COMMENT 'Ngày sinh',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Thời gian tạo tài khoản',
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Thời gian cập nhật',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Trạng thái tài khoản (kích hoạt hay không)',
  `phone` varchar(20) NOT NULL COMMENT 'Số điện thoại, không trùng lặp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `name`, `date_of_birth`, `createdAt`, `updatedAt`, `is_active`, `phone`) VALUES
(1, 'td@gmail.com', '$2b$10$cKOc5H2aSLwsft9R3CPt9.zJ3NYtHGr7mzb2jjjamMsJb.qn3xMf2', 'Âu Tấn Đạt', '2015-11-04', '2025-09-11 03:36:34', '2025-09-11 03:36:34', 1, '0101212100');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `work_orders`
--

CREATE TABLE `work_orders` (
  `work_order_id` int(11) NOT NULL,
  `description` text DEFAULT NULL COMMENT 'Mô tả đơn hàng hoặc ca sản xuất',
  `start_time` datetime NOT NULL COMMENT 'Thời gian bắt đầu',
  `end_time` datetime DEFAULT NULL COMMENT 'Thời gian kết thúc',
  `status` enum('pending','in_progress','completed','cancelled') DEFAULT 'pending' COMMENT 'Trạng thái',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `work_records`
--

CREATE TABLE `work_records` (
  `work_record_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `error_id` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `work_order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`accessory_id`);

--
-- Chỉ mục cho bảng `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`error_id`);

--
-- Chỉ mục cho bảng `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `fk_position_process` (`process_id`);

--
-- Chỉ mục cho bảng `processes`
--
ALTER TABLE `processes`
  ADD PRIMARY KEY (`process_id`);

--
-- Chỉ mục cho bảng `process_steps`
--
ALTER TABLE `process_steps`
  ADD PRIMARY KEY (`process_step_id`),
  ADD KEY `fk_process_steps_process` (`process_id`),
  ADD KEY `fk_accessory` (`accessory_id`);

--
-- Chỉ mục cho bảng `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`staff_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `fk_staff_position` (`position_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Chỉ mục cho bảng `work_orders`
--
ALTER TABLE `work_orders`
  ADD PRIMARY KEY (`work_order_id`);

--
-- Chỉ mục cho bảng `work_records`
--
ALTER TABLE `work_records`
  ADD PRIMARY KEY (`work_record_id`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `error_id` (`error_id`),
  ADD KEY `fk_workrecord_workorder` (`work_order_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accessories`
--
ALTER TABLE `accessories`
  MODIFY `accessory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `errors`
--
ALTER TABLE `errors`
  MODIFY `error_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `positions`
--
ALTER TABLE `positions`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `processes`
--
ALTER TABLE `processes`
  MODIFY `process_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `process_steps`
--
ALTER TABLE `process_steps`
  MODIFY `process_step_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `staffs`
--
ALTER TABLE `staffs`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID duy nhất';

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID duy nhất, tự động tăng', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `work_orders`
--
ALTER TABLE `work_orders`
  MODIFY `work_order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `work_records`
--
ALTER TABLE `work_records`
  MODIFY `work_record_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `fk_position_process` FOREIGN KEY (`process_id`) REFERENCES `processes` (`process_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `process_steps`
--
ALTER TABLE `process_steps`
  ADD CONSTRAINT `fk_accessory` FOREIGN KEY (`accessory_id`) REFERENCES `accessories` (`accessory_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_process_steps_process` FOREIGN KEY (`process_id`) REFERENCES `processes` (`process_id`);

--
-- Các ràng buộc cho bảng `staffs`
--
ALTER TABLE `staffs`
  ADD CONSTRAINT `fk_staff_position` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `work_records`
--
ALTER TABLE `work_records`
  ADD CONSTRAINT `fk_workrecord_workorder` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`work_order_id`),
  ADD CONSTRAINT `work_records_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  ADD CONSTRAINT `work_records_ibfk_2` FOREIGN KEY (`error_id`) REFERENCES `errors` (`error_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

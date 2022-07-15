     LEFT OUTER JOIN `roles` AS `ViewRole` ON `employee`.`id` = `ViewRole`.`id` WHERE `employee`.`company_id` = '61' AND `employee`.`is_deleted` = 0;







     LEFT OUTER JOIN `roles` AS `ViewRole` ON `employee`.`role` = `ViewRole`.`id` WHERE `employee`.`company_id` = '61' AND `employee`.`is_deleted` = 0;

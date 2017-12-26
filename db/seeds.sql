USE challenge;

INSERT INTO `challenge`.`Users` (`id`, `name`, `password`, `alias`, `email`, `email_verified`, `createdAt`, `updatedAt`) VALUES (NULL, 'testuser2', '$2a$10$KV6qPn/yM/ppvYzJqCG4y.DdkuRTdO4VPYcwwg.VROB4V5hAKANXG', NULL, 'pat2382@yahoo.com', '0', '', '');

INSERT INTO `challenge`.`Templates` (`id`, `name`, `rule`, `createdAt`, `updatedAt`) VALUES (NULL, 'test', 'rules aren''t there for a test', '', '');

INSERT INTO `challenge`.`Instances` (`challenge_id`, `challenger_proof`, `challenged_proof`, `state`, `createdAt`, `updatedAt`, `issuer_id`, `accepter_id`, `template_id`) VALUES (NULL, 'www.placehold.com', NULL, 'challenge-issued', '', '', '1', NULL, '1');
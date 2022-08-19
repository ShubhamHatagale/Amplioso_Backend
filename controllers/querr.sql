SELECT SUM(answer)/COUNT(id) as survey_mean,
SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=2) as internal_bench,
SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=2)*COUNT(id)/(SELECT COUNT(id) FROM companies AS sl) as external_bench 
FROM survey_answers WHERE manager_id=2 AND option_id=190 AND is_deleted=0







For Survey Mean-
query-
SELECT SUM(answer)/COUNT(id) as survey_mean
FROM survey_answers WHERE manager_id=2 AND option_id=190 AND is_deleted=0


For Survey Internal Benchmark
SELECT SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=`company_id`) as internal_bench
FROM survey_answers WHERE manager_id=2 AND option_id=190 AND is_deleted=0





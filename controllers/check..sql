SELECT SUM(answer)/COUNT(id) as survey_mean,
SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers 
WHERE company_id=company_id) as internal_bench,
SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers 
WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers
WHERE manager_id=${Data[0].manager_id} AND option_id=${Data[0].option_id} AND is_deleted=0
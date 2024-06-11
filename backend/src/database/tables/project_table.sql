--  USE projectmanagement;

create table project_table(
	project_id varchar(255) primary key  not null,
	project_name varchar(100) not null,
	project_description varchar (255),
	project_end_date varchar(50),
	project_assigned bit default 0
	)

-- DROP TABLE project_table

select * from project_table;

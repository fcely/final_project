

drop database db;
create database db;


use db;

insert into accounts values (1,1,'test',0,now(),now());

insert into badges values (1,1,1,now(),now());

insert into chores values (1,1,1,'car wash',10,0,now(),now(),now());

insert into transactions values(1,1,'deposit',20,'chore_desc',0,20,null, now(),now());

insert into users  values (1,'luis','cely','1234','fcely@me.com',1,1,now(),now());

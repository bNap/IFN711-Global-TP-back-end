# IFN711-Global-TP-back-end

#export database
mysqldump -u root -p project711 > project711.sql

#import
mysql -u root -p project711 < project711.sql

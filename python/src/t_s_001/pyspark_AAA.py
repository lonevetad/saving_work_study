import json
from pyspark.sql import SparkSession
import pandas as pd

folder_path = '..\\..\\resources\\'
file_name = ""
file_path = "" # folder_path + file_name

output_folder = "..\\..\\output\\"
output_file_name = "" # "loop_join_output"
output_file_path = "" # output_folder + output_file_name


def p(file, to_print):
    print(to_print)
    if isinstance(to_print, str):
        file.write(to_print)
        file.write('\n')


file_name = "lsys.json"
file_path = folder_path + file_name
output_file_name = "loop_join_output.txt"
output_file_path = output_folder + output_file_name

CONTACT_ID = "id" #"ContactId"
NEXT_CONTACT_ID = "next" #"NextContactId"

df = pd.read_json(file_path)

#Create PySpark SparkSession
spark = SparkSession.builder \
    .master("local[1]") \
    .appName("SparkByExamples.com") \
    .getOrCreate()
#Create PySpark DataFrame from Pandas
sparkDF=spark.createDataFrame(df) 
sparkDF.printSchema()
sparkDF.show()

'''
'''
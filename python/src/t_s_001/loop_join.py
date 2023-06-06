import json
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
    '''
    if isinstance(to_print, pd.DataFrame):
        json.dump(to_print, file)
    else:
        file.write(to_print)
    file.write('\n')
    '''
    

def doJoin():
    file_name = "dwh_traces__03_05_23.csv" # dwh_analysis__ ...
    file_path = folder_path + file_name
    output_file_name = "loop_join_output.txt"
    output_file_path = output_folder + output_file_name

    CONTACT_ID = "ContactId"
    NEXT_CONTACT_ID = "NextContactId"

    data = pd.read_csv(file_path, delimiter="|", header=1)


    
    # write to data.txt
    with open(output_file_path, 'w') as f:
        
        p(f, "START CYCLE")
        i = 0
        p(f, data.iloc[[0]])

        resulting_data = {}
        for d in data:
            p(f, type(d).str() )
            resulting_data[d[CONTACT_ID]] = d

        p(f, "starting")
        must_continue = True
        while must_continue:
            filtered = {}
            for d in data:
                if d[NEXT_CONTACT_ID] in resulting_data:
                    next = resulting_data[d[NEXT_CONTACT_ID]]
                    filtered[next[CONTACT_ID]] = next
            if len(filtered) > 0:
                resulting_data = filtered
            else:
                must_continue = False
            p(f, "\n\nresulting_data ->",)
            p(f, resulting_data)

            i += 1
            if i >= 1000:
                print("another 1000")
                i = 0

    print("finish :D")

def convertToJSON():
    file_name = "dwh_analysis__03_05_23.csv"
    file_path = folder_path + file_name
    output_file_name = "loop_join_output"
    output_file_path = output_folder + output_file_name

    print("file_path: ", file_path)
    print("output_file_path: ", output_file_path)




def doJoin_RealJSONFile():
    import pandas as pd

    file_name = "lsys.json"
    file_path = folder_path + file_name
    output_file_name = "loop_join_output.txt"
    output_file_path = output_folder + output_file_name

    CONTACT_ID = "id" #"ContactId"
    NEXT_CONTACT_ID = "next" #"NextContactId"

    df = pd.read_json(file_path)
    print(df.info())
    
    with open(output_file_path, 'w') as f:
        i = 0
        p(f, "starting json ")
        p(f, df.iloc[[0]])
        p(f, df.iloc[[1]])
        p(f, df.iloc[[2]])

        resulting_data = {}
        for  index, row in df.iterrows():
            p(f, row)
            resulting_data[row[CONTACT_ID]] = row

        p(f, "starting")
        must_continue = True
        while must_continue:
            filtered = {}
            for  index, row in df.iterrows():
                if row[NEXT_CONTACT_ID] in resulting_data:
                    next = resulting_data[row[NEXT_CONTACT_ID]]
                    filtered[next[CONTACT_ID]] = next
            if len(filtered) > 0:
                resulting_data = filtered
            else:
                must_continue = False
            p(f, "\n\nresulting_data ->",)
            p(f, resulting_data)

            i += 1
            if i >= 1000:
                print("another 1000")
                i = 0

        print("finish :D")


def main():
    convertToJSON()
    doJoin_RealJSONFile()

if __name__ == '__main__':
    print("start")
    main()
import os 
import shutil
import json

def changepath(location):
    newlocation=""
    for i in range(0,len(location)):
        if location[i] =='\\':
            newlocation+='/'
        else:
            newlocation+=location[i]
    return newlocation
location = changepath(f"{ os.getcwd()+'/temp/'}")
print(location)


def RemoveFiles():
    ''' These Function will Remove Files from the media folder which are not required after the file uploading '''
    dir =location
    shutil.rmtree(dir)
    file_obj = open(f"{ os.getcwd()}/filepath.txt",'a')
    file_obj.truncate(0)
    os.mkdir(dir)

def saveFileLocally(file):
    ''' These function will save file locally '''
    try:
        filename,extension = os.path.splitext(f"{file['file']}")
        with open(f"{location}@@{filename}{extension}",'wb+') as destination:
            for chunk in file['file'].chunks():
                destination.write(chunk)
        path =  f"{location+'@@'+ str(file['file'])}"
        return json.loads(json.dumps({'error':False,'msg':'','additionalmsg':'','data':path}))
    except Exception as e:
        return json.loads(json.dumps({'error':True,'msg':str(e),'additionalmsg':'Error occured in file uploading','data':''}))
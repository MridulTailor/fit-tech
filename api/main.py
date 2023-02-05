# Importing necessary libraries
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request 
from detect import detect

# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost", 
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
model = pickle.load(open('../model/calories2.pkl', 'rb'))
# meal_prediction_model = pickle.load(open('../model/meal_prediction.pkl', 'rb'))

# Defining the model input types
# class Candidate(BaseModel):
#     gender: int
#     bsc: float
#     workex: int
#     etest_p: float
#     msc: float

class Candidate(BaseModel):
    Gender: int
    Age: int
    Height: float
    Weight: float
    Duration: float
    Heart_Rate: float
    Body_Temp: float


# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "AI model API"}

# Setting up the calorie prediction route
@app.post("/prediction/")
async def get_predict(data: Candidate):
    sample = [[
        data.Gender,
        data.Age,
        data.Height,
        data.Weight,
        data.Duration,
        data.Heart_Rate,
        data.Body_Temp
    ]]

    hired = model.predict(sample).tolist()[0]

    return {
        "data": {
            'prediction': hired
            # 'interpretation': 'Candidate can be hired.' if hired == 1 else 'Candidate can not be hired.'
        }
    }

# @app.post("/predict-face/")
# async def predict_face(request: Request, file: bytes = File(...)):
#     data = {"success": False}

#     if request.method == "POST":
#         data = detect.detect(file)

#     return data 

@app.post("/predict-face/")
async def predict_video(file : UploadFile):
    import cv2
    import numpy as np
    import time
    import PoseModule as pm
    cap = cv2.VideoCapture(file.file)

    detector = pm.poseDetector()
    count = 0
    dir = 0
    pTime = 0
    while True:
        success, img = cap.read()
        img = cv2.resize(img, (1280, 720))
    # img = cv2.imread("AiTrainer/test.jpg")
        img = detector.findPose(img, False)
        lmList = detector.findPosition(img, False)
    # print(lmList)
        if len(lmList) != 0:
        # Right Arm
            angle = detector.findAngle(img, 12, 14, 16)
        # # Left Arm
        #angle = detector.findAngle(img, 11, 13, 15,False)
            per = np.interp(angle, (210, 310), (0, 100))
            bar = np.interp(angle, (220, 310), (650, 100))
        # print(angle, per)

        # Check for the dumbbell curls
            color = (255, 0, 255)
            if per == 100:
                color = (0, 255, 0)
                if dir == 0:
                    count += 0.5
                    dir = 1
            if per == 0:
                color = (0, 255, 0)
                if dir == 1:
                    count += 0.5
                    dir = 0
            print(count)

        # Draw Bar
            cv2.rectangle(img, (1100, 100), (1175, 650), color, 3)
            cv2.rectangle(img, (1100, int(bar)), (1175, 650), color, cv2.FILLED)
            cv2.putText(img, f'{int(per)} %', (1100, 75), cv2.FONT_HERSHEY_PLAIN, 4,
                    color, 4)

        # Draw Curl Count
            cv2.rectangle(img, (0, 450), (250, 720), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (45, 670), cv2.FONT_HERSHEY_PLAIN, 15,
                    (255, 0, 0), 25)

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5,
                (255, 0, 0), 5)

        # return cv2.imshow("Image", img)
        return img
        # cv2.waitKey(1)

    

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')
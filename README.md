# 2022_GDSC_Solution-Challenge
## About Us
### Our Team Name
Gisung( same pronunciation with 'Intelligence' in Korean) 
### Members
Dongmin Shin, Minseok Yun, Chaeyul Kang, Minjae Kim         

**We are University students who are greatly interested in Development!** 

## About GisungIn
### Goals
Since the outbreak of the COVID 19, more and more people are turning to developers. As a lot of non-majors also turn their jobs, many platforms that offer various development-related internet lectures were naturally created. Some of these lectures are provided for free, while the major of them are provided for profit.     
So, we would like to create a new non-profit platform where all people interested in development, regardless of age or gender, can receive customized development education materials at the university level.
```
Offering the Sources of Education to the future Developers and Personalizing the lectures to gather preference related to those sources by simple motion
```
> ![image](https://user-images.githubusercontent.com/91933277/159130322-5d9f8fd4-bd6f-4b79-87dc-92eee764874a.png)     
**‣Number 4 of SDGs, Quality Education**  

### Effect
The user interacts with the sources through simple actions while exploring the materials realated to the field you want to be recommended.
If you are interested in or willing to participate in the source recommended on the website, Right click. Otherwise, Left click. If you are interested and willing to join, Swipe Right. Otherwise, Swipe left. The accumulated user's "MyLectures" result in appear as increasingly customized results.


## Website Functions
#### • Create an account in Main Page
#### • Express personal preference by clicking the buttons on both sides of the POP-UP of various educational sources
#### • In the Website, We can use 'Left-Right-Click motion' and In the App, We can use 'Swiping'
#### • Offer personalized information continuously which were accumulated after analyzed them
#### • Setting the categories of languages which you want to use and Gathering the MY LECTURE on one page while developing in the left Side bar

       
## Future Proposal
• Enlarge the target from developers to some others specialties      
• Conjugate the variable GisungIn Platform System to other various fields, ex) recruitment, education, hobby etc             
• Anyone can easily access the vast amounts of sources scattered on the existing platforms, and can collect and view the provided personalized information at a glance.
• In the future, the recommendation algorithm using AI technology can be deepened and used.

## Development Tool
### Front end
• React       
• Material UI
### Backend  
• FireBase
We are provided multiple functional tools which include Backend, DataBase, Hosting and Authentication easily from Firebase
### DataBase
• FireStore     

## Guide to Execution
### For development
1. install Node.js and npm
2. install package
```
$git clone https://github.com/newdm2000/2022_GDSC_Solution-Challenge.git
$cd 2022_GDSC_Solution-Challenge/GiSungIn/client
$npm install
```
3. connect firebase
• Create an .env file in the 2022_GDSC_Solution-Challenge/GiSungIn/client path.    
• Please put the firebase CLI in the form below in ......      
```
REACT_APP_API_KEY=.....
REACT_APP_AUTH_DOMAIN=.....
REACT_APP_PROJECT_ID=.....
REACT_APP_STORAGE_BUCKET=.....
REACT_APP_MESSAGE_SENDER_ID=.....
REACT_APP_APP_ID=.....
```
•Please contect our email newdm2000@gmail.com or github for connect out firebase CLI key.      
4. npm start
### For deploy
1. build and deploy
```
$cd 2022_GDSC_Solution-Challenge/GiSungIn/client
$npm build
$firebase deploy
```


## Design
#### 1st Draft 
> ![image](https://user-images.githubusercontent.com/91933277/159130051-ffce077b-92db-429b-9538-ed7e709ddbcc.png)
#### Final UI
>

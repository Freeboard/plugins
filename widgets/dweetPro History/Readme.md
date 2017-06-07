Bug Labs is proud to release our newest addition to dweetPro and freeboard, Historical Charts!

Our latest charting library works with stored dweetPro data (https://dweetPro.io), which can only be accessed using your dweetPro account credentials.

The following tutorial will walk through setup and usage of the History Widget.

### Step 1:

Connect your dweetPro account:
Add a new datasource \
Select Dweet V2 Storage


Fill out datasource details:
Give your datasource a name
Add the thing-name of the dweetPro device you want to use
Click button to return all dweets, or choose a start and end date
Make sure the data returns as an Array, then click SAVE
	

Enter your dweetPro account details.
After saving your datasource details, you will be prompted to enter your dweetPro login details. Enter details and click Login



If you see a blank popup, click Login, then refresh the datasource


You should now see a last updated time next to your datasource:


Note: you must have data available in your account for the datasource to update properly.  If you do not have data in your account, please add some via the dweetPro console:  https://github.com/buglabs/dweetpro.io-docs


### Step 2: 

Visualize your stored data:
Add a new pane
Add the Historical Widget as pictured below



Fill in the widget details:
Choose between Line or Bar chart
Add the Data Array (Just click the + DATASOURCE button and select high level source)
Add the Data Field (Using same DATASOURCE as earlier, select the arrays, fields, and data type) 
Select the Time Frame
All, Last Minute, Hour, Day, Week, Month
Enter Y Min and Max, or leave blank
If left blank, Min and Max will be automatically selected by available data min/max
Choose the size (please make note of the instructions below the Size field, which explains that the Pane’s Column setting must be edited according to the chosen chart size)
Click SAVE






### Step 3: 

Enjoy! 

Here are two chart examples showing the same data:


   


Congratulations!  You have successfully added stored history to freeboard.

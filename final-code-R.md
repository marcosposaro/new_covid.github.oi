---
title: "Covid-19 Project"
output: html_notebook
---

#In this file, we are going to work with a COVID-19 dataset from the Johns Hopkins University and the World Health Organization (WHO). The aim is to answer the following questions:
# 1. What was the deadliest day in 2020?
# 2. How many deaths were registered in this exactly day by country/Where did the deaths happen?
# 3. A COVID-19 ranking by the deadliest days in 2020.

#Firstly, we need to install the httr package to get the dataset from a URL:
```{r}
install.packages("httr")
library(httr)
```

#Getting the dataset from the URL
```{r}
jhudata <- read.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv", sep = ",", header = TRUE, stringsAsFactors = FALSE)
``` 

#Discovering details about the dataset
```{r}
typeof(jhudata)
```

```{r}
class(jhudata)
``` 

```{r}
head(jhudata)
```
#The dataset has extra columns with information that will not be necessary for this task (Lat and Long). So, we can delete them:

```{r}
jhudata<- subset(jhudata, select = -c(Lat,Long))
``` 


#Having a look at the dataset, we can notice that the columns are summarizing the number of deaths of the days before (a, a+b, a+b+c..). However, we need to isolate the numbers.


```{r}
jhudata <- cbind(jhudata[1:3], t(apply(jhudata[-1:-2], 1, diff)))
```

#In this step, we are going to clean the territories according to the World Bank geographical classification (States, overseas regions and autonomous provinces).

```{r}
jhudata <- jhudata
for(i in 1:272){
  if((jhudata[i,1] == "Australian Capital Territory") ||
     (jhudata[i,1] == "New South Wales") ||
     (jhudata[i,1] == "Northern Territory") ||
     (jhudata[i,1] == "Queensland") ||
     (jhudata[i,1] == "South Australia") ||
     (jhudata[i,1] == "Tasmania") ||
     (jhudata[i,1] == "Victoria") ||
     (jhudata[i,1] == "Western Australia") ||
     (jhudata[i,1] == "Alberta") ||
     (jhudata[i,1] == "British Columbia") ||
     (jhudata[i,1] == "Diamond Princess") ||
     (jhudata[i,1] == "Grand Princess") ||
     (jhudata[i,1] == "Manitoba") ||
     (jhudata[i,1] == "New Brunswick") ||
     (jhudata[i,1] == "Newfoundland and Labrador") ||
     (jhudata[i,1] == "Northwest Territories") ||
     (jhudata[i,1] == "Nova Scotia") ||
     (jhudata[i,1] == "Nunavut") ||
     (jhudata[i,1] == "Ontario") ||
     (jhudata[i,1] == "Prince Edward Island") ||
     (jhudata[i,1] == "Quebec") ||
     (jhudata[i,1] == "Repatriated Travellers") ||
     (jhudata[i,1] == "Saskatchewan") ||
     (jhudata[i,1] == "Yukon") ||
     (jhudata[i,1] == "Anhui") ||
     (jhudata[i,1] == "Beijing") ||
     (jhudata[i,1] == "Chongqing") ||
     (jhudata[i,1] == "Fujian") ||
     (jhudata[i,1] == "Gansu") ||
     (jhudata[i,1] == "Guangdong") ||
     (jhudata[i,1] == "Guangxi") ||
     (jhudata[i,1] == "Guizhou") ||
     (jhudata[i,1] == "Hainan") ||
     (jhudata[i,1] == "Hebei") ||
     (jhudata[i,1] == "Heilongjiang") ||
     (jhudata[i,1] == "Henan") ||
     (jhudata[i,1] == "Hubei") ||
     (jhudata[i,1] == "Hunan") ||
     (jhudata[i,1] == "Inner Mongolia") ||
     (jhudata[i,1] == "Jiangsu") ||
     (jhudata[i,1] == "Jiangxi") ||
     (jhudata[i,1] == "Jilin") ||
     (jhudata[i,1] == "Liaoning") ||
     (jhudata[i,1] == "Ningxia") ||
     (jhudata[i,1] == "Qinghai") ||
     (jhudata[i,1] == "Shaanxi") ||
     (jhudata[i,1] == "Shandong") ||
     (jhudata[i,1] == "Shanghai") ||
     (jhudata[i,1] == "Shanxi") ||
     (jhudata[i,1] == "Sichuan") ||
     (jhudata[i,1] == "Tianjin") ||
     (jhudata[i,1] == "Tibet") ||
     (jhudata[i,1] == "Xinjiang") ||
     (jhudata[i,1] == "Yunnan") ||
     (jhudata[i,1] == "Zhejiang")){
    jhudata[i,1] = " "
  }
}
```

#As there are repetitions in the column "country.region" (some countries appear more than 2 times, for example, Canada and China), we need to summarize the number of deaths by each country, overseas regions and autonomous provinces. I am going to use the ddply function to do that, which is inside the plyr package.

```{r}
install.packages("plyr")
library(plyr)
```

```{r}
jhudata <- ddply(jhudata,
      c("Country.Region","Province.State"),
      summarise,
      X1.22.20 = sum(X1.22.20),
      X1.23.20 = sum(X1.23.20),
      X1.24.20 = sum(X1.24.20),
      X1.25.20 = sum(X1.25.20),
      X1.26.20 = sum(X1.26.20),
      X1.27.20 = sum(X1.26.20),
      X1.28.20 = sum(X1.28.20),
      X1.29.20 = sum(X1.29.20),
      X1.30.20 = sum(X1.30.20),
      X1.31.20 = sum(X1.31.20),
      X2.1.20 = sum(X2.1.20),
      X2.2.20 = sum(X2.2.20),
      X2.3.20 = sum(X2.3.20),
      X2.4.20 = sum(X2.4.20),
      X2.5.20 = sum(X2.5.20),
      X2.6.20 = sum(X2.6.20),
      X2.7.20 = sum(X2.7.20),
      X2.8.20 = sum(X2.8.20),
      X2.9.20 = sum(X2.9.20),
      X2.10.20 = sum(X2.10.20),
      X2.11.20 = sum(X2.11.20),
      X2.12.20 = sum(X2.12.20),
      X2.13.20 = sum(X2.13.20),
      X2.14.20 = sum(X2.14.20),
      X2.15.20 = sum(X2.15.20),
      X2.16.20 = sum(X2.16.20),
      X2.17.20 = sum(X2.17.20),
      X2.18.20 = sum(X2.18.20),
      X2.19.20 = sum(X2.19.20),
      X2.20.20 = sum(X2.20.20),
      X2.21.20 = sum(X2.21.20),
      X2.22.20 = sum(X2.22.20),
      X2.23.20 = sum(X2.23.20),
      X2.24.20 = sum(X2.24.20),
      X2.25.20 = sum(X2.25.20),
      X2.26.20 = sum(X2.26.20),
      X2.27.20 = sum(X2.27.20),
      X2.28.20 = sum(X2.28.20),
      X2.29.20 = sum(X2.29.20),
      X3.1.20 = sum(X3.1.20),
      X3.2.20 = sum(X3.2.20),
      X3.3.20 = sum(X3.3.20),
      X3.4.20 = sum(X3.4.20),
      X3.5.20 = sum(X3.5.20),
      X3.6.20 = sum(X3.6.20),
      X3.7.20 = sum(X3.7.20),
      X3.8.20 = sum(X3.8.20),
      X3.9.20 = sum(X3.9.20),
      X3.10.20 = sum(X3.10.20),
      X3.11.20 = sum(X3.11.20),
      X3.12.20 = sum(X3.12.20),
      X3.13.20 = sum(X3.13.20),
      X3.14.20 = sum(X3.14.20),
      X3.15.20 = sum(X3.15.20),
      X3.16.20 = sum(X3.16.20),
      X3.17.20 = sum(X3.17.20),
      X3.18.20 = sum(X3.18.20),
      X3.19.20 = sum(X3.19.20),
      X3.20.20 = sum(X3.20.20),
      X3.21.20 = sum(X3.21.20),
      X3.22.20 = sum(X3.22.20),
      X3.23.20 = sum(X3.23.20),
      X3.24.20 = sum(X3.24.20),
      X3.25.20 = sum(X3.25.20),
      X3.26.20 = sum(X3.26.20),
      X3.27.20 = sum(X3.27.20),
      X3.28.20 = sum(X3.28.20),
      X3.29.20 = sum(X3.29.20),
      X3.30.20 = sum(X3.30.20),
      X3.31.20 = sum(X3.31.20),
      X4.1.20 = sum(X4.1.20),
      X4.2.20 = sum(X4.2.20),
      X4.3.20 = sum(X4.3.20),
      X4.4.20 = sum(X4.4.20),
      X4.5.20 = sum(X4.5.20),
      X4.6.20 = sum(X4.6.20),
      X4.7.20 = sum(X4.7.20),
      X4.8.20 = sum(X4.8.20),
      X4.9.20 = sum(X4.9.20),
      X4.10.20 = sum(X4.10.20),
      X4.11.20 = sum(X4.11.20),
      X4.12.20 = sum(X4.12.20),
      X4.13.20 = sum(X4.13.20),
      X4.14.20 = sum(X4.14.20),
      X4.15.20 = sum(X4.15.20),
      X4.16.20 = sum(X4.16.20),
      X4.17.20 = sum(X4.17.20),
      X4.18.20 = sum(X4.18.20),
      X4.19.20 = sum(X4.19.20),
      X4.20.20 = sum(X4.20.20),
      X4.21.20 = sum(X4.21.20),
      X4.22.20 = sum(X4.22.20),
      X4.23.20 = sum(X4.23.20),
      X4.24.20 = sum(X4.24.20),
      X4.25.20 = sum(X4.25.20),
      X4.26.20 = sum(X4.26.20),
      X4.27.20 = sum(X4.27.20),
      X4.28.20 = sum(X4.28.20),
      X4.29.20 = sum(X4.29.20),
      X4.30.20 = sum(X4.30.20),
      X5.1.20 = sum(X5.1.20),
      X5.2.20 = sum(X5.2.20),
      X5.3.20 = sum(X5.3.20),
      X5.4.20 = sum(X5.4.20),
      X5.5.20 = sum(X5.5.20),
      X5.6.20 = sum(X5.6.20),
      X5.7.20 = sum(X5.7.20),
      X5.8.20 = sum(X5.8.20),
      X5.9.20 = sum(X5.9.20),
      X5.10.20 = sum(X5.10.20),
      X5.11.20 = sum(X5.11.20),
      X5.12.20 = sum(X5.12.20),
      X5.13.20 = sum(X5.13.20),
      X5.14.20 = sum(X5.14.20),
      X5.15.20 = sum(X5.15.20),
      X5.16.20 = sum(X5.16.20),
      X5.17.20 = sum(X5.17.20),
      X5.18.20 = sum(X5.18.20),
      X5.19.20 = sum(X5.19.20),
      X5.20.20 = sum(X5.20.20),
      X5.21.20 = sum(X5.21.20),
      X5.22.20 = sum(X5.22.20),
      X5.23.20 = sum(X5.23.20),
      X5.24.20 = sum(X5.24.20),
      X5.25.20 = sum(X5.25.20),
      X5.26.20 = sum(X5.26.20),
      X5.27.20 = sum(X5.27.20),
      X5.28.20 = sum(X5.28.20),
      X5.29.20 = sum(X5.29.20),
      X5.30.20 = sum(X5.30.20),
      X5.31.20 = sum(X5.31.20),
      X6.1.20 = sum(X6.1.20),
      X6.2.20 = sum(X6.2.20),
      X6.3.20 = sum(X6.3.20),
      X6.4.20 = sum(X6.4.20),
      X6.5.20 = sum(X6.5.20),
      X6.6.20 = sum(X6.6.20),
      X6.7.20 = sum(X6.7.20),
      X6.8.20 = sum(X6.8.20),
      X6.9.20 = sum(X6.9.20),
      X6.10.20 = sum(X6.10.20),
      X6.11.20 = sum(X6.11.20),
      X6.12.20 = sum(X6.12.20),
      X6.13.20 = sum(X6.13.20),
      X6.14.20 = sum(X6.14.20),
      X6.15.20 = sum(X6.15.20),
      X6.16.20 = sum(X6.16.20),
      X6.17.20 = sum(X6.17.20),
      X6.18.20 = sum(X6.18.20),
      X6.19.20 = sum(X6.19.20),
      X6.20.20 = sum(X6.20.20),
      X6.21.20 = sum(X6.21.20),
      X6.22.20 = sum(X6.22.20),
      X6.23.20 = sum(X6.23.20),
      X6.24.20 = sum(X6.24.20),
      X6.25.20 = sum(X6.25.20),
      X6.26.20 = sum(X6.26.20),
      X6.27.20 = sum(X6.27.20),
      X6.28.20 = sum(X6.28.20),
      X6.29.20 = sum(X6.29.20),
      X6.30.20 = sum(X6.30.20),
      X7.1.20 = sum(X7.1.20),
      X7.2.20 = sum(X7.2.20),
      X7.3.20 = sum(X7.3.20),
      X7.4.20 = sum(X7.4.20),
      X7.5.20 = sum(X7.5.20),
      X7.6.20 = sum(X7.6.20),
      X7.7.20 = sum(X7.7.20),
      X7.8.20 = sum(X7.8.20),
      X7.9.20 = sum(X7.9.20),
      X7.10.20 = sum(X7.10.20),
      X7.11.20 = sum(X7.11.20),
      X7.12.20 = sum(X7.12.20),
      X7.13.20 = sum(X7.13.20),
      X7.14.20 = sum(X7.14.20),
      X7.15.20 = sum(X7.15.20),
      X7.16.20 = sum(X7.16.20),
      X7.17.20 = sum(X7.17.20),
      X7.18.20 = sum(X7.18.20),
      X7.19.20 = sum(X7.19.20),
      X7.20.20 = sum(X7.20.20),
      X7.21.20 = sum(X7.21.20),
      X7.22.20 = sum(X7.22.20),
      X7.23.20 = sum(X7.23.20),
      X7.24.20 = sum(X7.24.20),
      X7.25.20 = sum(X7.25.20),
      X7.26.20 = sum(X7.26.20),
      X7.27.20 = sum(X7.27.20),
      X7.28.20 = sum(X7.28.20),
      X7.29.20 = sum(X7.29.20),
      X7.30.20 = sum(X7.30.20),
      X7.31.20 = sum(X7.31.20),
      X8.1.20 = sum(X8.1.20),
      X8.2.20 = sum(X8.2.20),
      X8.3.20 = sum(X8.3.20),
      X8.4.20 = sum(X8.4.20),
      X8.5.20 = sum(X8.5.20),
      X8.6.20 = sum(X8.6.20),
      X8.7.20 = sum(X8.7.20),
      X8.8.20 = sum(X8.8.20),
      X8.9.20 = sum(X8.9.20),
      X8.10.20 = sum(X8.10.20),
      X8.11.20 = sum(X8.11.20),
      X8.12.20 = sum(X8.12.20),
      X8.13.20 = sum(X8.13.20),
      X8.14.20 = sum(X8.14.20),
      X8.15.20 = sum(X8.15.20),
      X8.16.20 = sum(X8.16.20),
      X8.17.20 = sum(X8.17.20),
      X8.18.20 = sum(X8.18.20),
      X8.19.20 = sum(X8.19.20),
      X8.20.20 = sum(X8.20.20),
      X8.21.20 = sum(X8.21.20),
      X8.22.20 = sum(X8.22.20),
      X8.23.20 = sum(X8.23.20),
      X8.24.20 = sum(X8.24.20),
      X8.25.20 = sum(X8.25.20),
      X8.26.20 = sum(X8.26.20),
      X8.27.20 = sum(X8.27.20),
      X8.28.20 = sum(X8.28.20),
      X8.29.20 = sum(X8.29.20),
      X8.30.20 = sum(X8.30.20),
      X8.31.20 = sum(X8.31.20),
      X9.1.20 = sum(X9.1.20),
      X9.2.20 = sum(X9.2.20),
      X9.3.20 = sum(X9.3.20),
      X9.4.20 = sum(X9.4.20),
      X9.5.20 = sum(X9.5.20),
      X9.6.20 = sum(X9.6.20),
      X9.7.20 = sum(X9.7.20),
      X9.8.20 = sum(X9.8.20),
      X9.9.20 = sum(X9.9.20),
      X9.10.20 = sum(X9.10.20),
      X9.11.20 = sum(X9.11.20),
      X9.12.20 = sum(X9.12.20),
      X9.13.20 = sum(X9.13.20),
      X9.14.20 = sum(X9.14.20),
      X9.15.20 = sum(X9.15.20),
      X9.16.20 = sum(X9.16.20),
      X9.17.20 = sum(X9.17.20),
      X9.18.20 = sum(X9.18.20),
      X9.19.20 = sum(X9.19.20),
      X9.20.20 = sum(X9.20.20),
      X9.21.20 = sum(X9.21.20),
      X9.22.20 = sum(X9.22.20),
      X9.23.20 = sum(X9.23.20),
      X9.24.20 = sum(X9.24.20),
      X9.25.20 = sum(X9.25.20),
      X9.26.20 = sum(X9.26.20),
      X9.27.20 = sum(X9.27.20),
      X9.28.20 = sum(X9.28.20),
      X9.29.20 = sum(X9.29.20),
      X9.30.20 = sum(X9.30.20),
      X10.1.20 = sum(X10.1.20),
      X10.2.20 = sum(X10.2.20),
      X10.3.20 = sum(X10.3.20),
      X10.4.20 = sum(X10.4.20),
      X10.5.20 = sum(X10.5.20),
      X10.6.20 = sum(X10.6.20),
      X10.7.20 = sum(X10.7.20),
      X10.8.20 = sum(X10.8.20),
      X10.9.20 = sum(X10.9.20),
      X10.10.20 = sum(X10.10.20),
      X10.11.20 = sum(X10.11.20),
      X10.12.20 = sum(X10.12.20),
      X10.13.20 = sum(X10.13.20),
      X10.14.20 = sum(X10.14.20),
      X10.15.20 = sum(X10.15.20),
      X10.16.20 = sum(X10.16.20),
      X10.17.20 = sum(X10.17.20),
      X10.18.20 = sum(X10.18.20),
      X10.19.20 = sum(X10.19.20),
      X10.20.20 = sum(X10.20.20),
      X10.21.20 = sum(X10.21.20),
      X10.22.20 = sum(X10.22.20),
      X10.23.20 = sum(X10.23.20),
      X10.24.20 = sum(X10.24.20),
      X10.25.20 = sum(X10.25.20),
      X10.26.20 = sum(X10.26.20),
      X10.27.20 = sum(X10.27.20),
      X10.28.20 = sum(X10.28.20),
      X10.29.20 = sum(X10.29.20),
      X10.30.20 = sum(X10.30.20),
      X10.31.20 = sum(X10.31.20),
      X11.1.20 = sum(X11.1.20),
      X11.2.20 = sum(X11.2.20),
      X11.3.20 = sum(X11.3.20),
      X11.4.20 = sum(X11.4.20),
      X11.5.20 = sum(X11.5.20),
      X11.6.20 = sum(X11.6.20),
      X11.7.20 = sum(X11.7.20),
      X11.8.20 = sum(X11.8.20),
      X11.9.20 = sum(X11.9.20),
      X11.10.20 = sum(X11.10.20),
      X11.11.20 = sum(X11.11.20),
      X11.12.20 = sum(X11.12.20),
      X11.13.20 = sum(X11.13.20),
      X11.14.20 = sum(X11.14.20),
      X11.15.20 = sum(X11.15.20),
      X11.16.20 = sum(X11.16.20),
      X11.17.20 = sum(X11.17.20),
      X11.18.20 = sum(X11.18.20),
      X11.19.20 = sum(X11.19.20),
      X11.20.20 = sum(X11.20.20),
      X11.21.20 = sum(X11.21.20),
      X11.22.20 = sum(X11.22.20),
      X11.23.20 = sum(X11.23.20),
      X11.24.20 = sum(X11.24.20),
      X11.25.20 = sum(X11.25.20),
      X11.26.20 = sum(X11.26.20),
      X11.27.20 = sum(X11.27.20),
      X11.28.20 = sum(X11.28.20),
      X11.29.20 = sum(X11.29.20),
      X11.30.20 = sum(X11.30.20),
      X12.1.20 = sum(X12.1.20),
      X12.2.20 = sum(X12.2.20),
      X12.3.20 = sum(X12.3.20),
      X12.4.20 = sum(X12.4.20),
      X12.5.20 = sum(X12.5.20),
      X12.6.20 = sum(X12.6.20),
      X12.7.20 = sum(X12.7.20),
      X12.8.20 = sum(X12.8.20),
      X12.9.20 = sum(X12.9.20),
      X12.10.20 = sum(X12.10.20),
      X12.11.20 = sum(X12.11.20),
      X12.12.20 = sum(X12.12.20),
      X12.13.20 = sum(X12.13.20),
      X12.14.20 = sum(X12.14.20),
      X12.15.20 = sum(X12.15.20),
      X12.16.20 = sum(X12.16.20),
      X12.17.20 = sum(X12.17.20),
      X12.18.20 = sum(X12.18.20),
      X12.19.20 = sum(X12.19.20),
      X12.20.20 = sum(X12.20.20),
      X12.21.20 = sum(X12.21.20),
      X12.22.20 = sum(X12.22.20),
      X12.23.20 = sum(X12.23.20),
      X12.24.20 = sum(X12.24.20),
      X12.25.20 = sum(X12.25.20),
      X12.26.20 = sum(X12.26.20),
      X12.27.20 = sum(X12.27.20),
      X12.28.20 = sum(X12.28.20),
      X12.29.20 = sum(X12.29.20),
      X12.30.20 = sum(X12.30.20),
      X12.31.20 = sum(X12.31.20)
      )
```

#As the Johns Hopkins dataset starts on 22nd January, I used a dataset from the WHO for the previous days, detailing each death. In this step, we are going to join the WHO numbers to the JHU spreadsheet, correcting the number of deaths on 22nd January (from 17 deaths to 11).
#Later, I´ll insert new columns for the days 11th (when the first death was registered) to 21st January. 

```{r}
for(x in 1:220){
  if((jhudata[x,1] == "China") && (jhudata[x,3] == 17)){
    jhudata[x,3] = 11
  }
}
```

#Now we have the numbers summarized by date and country.
#But we also have 347 columns for days (each day is a column). To solve this, I am going to create a unique column for the date. 
#The function is the "pivot longer", which is part of the "tidyr" package. 

```{r}
install.packages("tidyr")
library(tidyr)
```	

```{r}
jhudata<-pivot_longer(jhudata, cols =-Country.Region:-Province.State, names_to = "date",values_to = "deaths")
```

#The next step is to correct the date format, excluding the "x" before the numbers. I am going to use the "dplyr" package and the pipe command (%>%), as well as the "stringr" package and the str_sub function. 

```{r}
install.packages("dplyr")
library(dplyr)
```

```{r}
install.packages("stringr")
library("stringr")
```

```{r}
jhudata <- jhudata %>% 
  mutate(date = str_sub(jhudata$date, start = 2))
```

#The date column is using an xx.xx.xx format, where the dot(.) is a regex. So we need to change the dots to "/". I decided to do that to avoid problems in coding in the future.
#I am going to use the mutate function combined with the pipe command.

```{r}
jhudata <- jhudata %>% 
  mutate(date = gsub(".", "/", jhudata$date, fixed = TRUE))
```

#In this step, I am going to create new columns for the deaths registered between 11-21 January. I´ve collected the numbers from the WHO website.

```{r}
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/11/20", deaths = 1)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/12/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/13/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/14/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/15/20", deaths = 1)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/16/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/17/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/18/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/19/20", deaths = 1)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/20/20", deaths = 0)
jhudata <- rbind(jhudata, new_row)
new_row <- data.frame(Country.Region = "China",Province.State = " ", date = "1/21/20", deaths = 3)
jhudata <- rbind(jhudata, new_row)
rm(new_row)
```

#Now I am going to answer the first question: What was the deadliest day in 2020? The following chunk uses the plyr package and the ddply command. It summarizes the deaths by date. 


```{r}
jhudata_deaths_date <- ddply(jhudata,
      c("date"),
      summarise,
      deaths = sum(deaths))
```

#In this step, I am going to show the dataset in descending order (question number 3: a ranking).

```{r}
jhudata_deaths_date <- jhudata_deaths_date %>% 
  arrange(desc(deaths))
```

#Using SQL and isolating the deadliest day:
```{r}
install.packages("sqldf")
library(sqldf)
```

```{r}
deadliest_day <- sqldf('select jhudata_deaths_date.date, Max(jhudata_deaths_date.deaths) from jhudata_deaths_date  order by jhudata_deaths_date.deaths desc')
```

#Answering the second question: Where did the deaths happen? 

```{r}
countries_deadliest_day <- sqldf('select * from jhudata, deadliest_day where jhudata.date = deadliest_day.date
                and jhudata.deaths > 0 ')
```

#Deleting the repeted column "date"

```{r}
countries_deadliest_day<- subset(countries_deadliest_day, select = -c(3))
``` 

#Saving the new datasets as CSV file
```{r}
write.csv(countries_deadliest_day,'countries_deadliest_day.csv')
```

```{r}
write.csv(jhudata_deaths_date,'jhudata_deaths_date.csv')
```


####
#Weeks after I finished this code, I´ve discovered a new COVID-19 dataset containing granular data about geolocation. So I´ve decided to use it to improve my data analysis.  

#Getting the data from a URL
```{r}
COVID_19_LUT <- read.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19_Unified-Dataset/master/COVID-19_LUT.csv", sep = ",", header = TRUE, stringsAsFactors = FALSE)
```

#The following dataset complements the previous URL. It contains the countries' and the province´s IDs.  

#To download the new dataset and import it on R: https://github.com/CSSEGISandData/COVID-19_Unified-Dataset/blob/master/COVID-19.rds 

```{r}
install.packages("rio")
library("rio")
```

```{r}
import("COVID-19.rds")
```

```{r}
COVID19<-import("COVID-19.rds")
```

#Filtering the geolocation related to the deadliest day.

```{r}
new_table<- sqldf('select COVID_19_LUT.ID, COVID_19_LUT.Level, COVID_19_LUT.ISO1_3N,
COVID_19_LUT.ISO1_3C, COVID_19_LUT.ISO1_2C, COVID_19_LUT.ISO2, COVID_19_LUT.ISO2_UID, COVID_19_LUT.FIPS, COVID_19_LUT.NUTS, COVID_19_LUT.AGS,
COVID_19_LUT.IBGE, COVID_19_LUT.ZCTA, COVID_19_LUT.Longitude, COVID_19_LUT.Latitude, COVID_19_LUT.Population,
COVID_19_LUT.Admin, COVID_19_LUT.Admin0, COVID_19_LUT.Admin1, COVID_19_LUT.Admin2, COVID_19_LUT.Admin3, COVID_19_LUT.NameID, COVID19.Date, COVID19.Cases, COVID19.Cases_New, COVID19.Type, COVID19.Age, COVID19.Sex, COVID19.Source
from COVID_19_LUT, COVID19 where COVID_19_LUT.ID = COVID19.ID
and COVID19.Type = "Deaths" and COVID19.Cases_New > 0')
```

```{r}
countries_deadliest_day2 <- new_table %>% filter(Date == "2020-12-29")
```
#Saving the new deadliest table:

```{r}
write.csv(countries_deadliest_day2,'countries_deadliest_day2.csv')
```



# Ayush - Self Monitoring ECG machine

This project is initiated to develop a self monitoring ECG machine which is able to diagnose or even predict abnormalities related to heart .

## How are we doing it ?

The setup we are going forward with is single lead ECG compared to traditional 12- lead ECG.
* We got hold of Protocentral's MAX30003 which is a Ultra-Low Power, Single-Channel Integrated Biopotential AFE. More details of MAX30003 can be found [here](https://www.maximintegrated.com/en/products/analog/data-converters/analog-front-end-ics/MAX30003.html)
*  We selected the Famous BBC micro:bit to tranfer the data from MAX30003 through SPI interface (for now). More info of BBC Micro:bit can be found [here](http://microbit.org/).
* For software development we used [Arduino IDE](https://www.arduino.cc/en/Main/Software). We have configured IDE to support micro:bit. Refer [this](https://learn.adafruit.com/use-micro-bit-with-arduino/overview) documentation.
* For visualizing graph, we are using [processing IDE](https://processing.org/) for now.



###Stay tuned :)


## Reference Materials

* [ECG Biometrics](https://www.researchgate.net/publication/271386679/download)
* [Heart Rate Variability](https://www.researchgate.net/publication/271386679/download)
* [Deep Learning Approach for Active Classification of Electrocardiogram Signals](https://www.researchgate.net/publication/293174514_Deep_Learning_Approach_for_Active_Classification_of_Electrocardiogram_Signals?enrichId=rgreq-2e8f274359ced6036ca47df5bd75362d-XXX&enrichSource=Y292ZXJQYWdlOzI5MzE3NDUxNDtBUzozNDU2MDUzNjE2ODQ0ODRAMTQ1OTQxMDE0NzUyNw%3D%3D&el=1_x_2&_esc=publicationCoverPdf)


<!--
### Prerequisites

What things you need to install the software and how to install them

			```
			Give examples
			```

			### Installing

			A step by step series of examples that tell you how to get a development env running

			Say what the step will be

			```
			Give the example
			```

			And repeat

			```
			until finished
			```

			End with an example of getting some data out of the system or using it for a little demo

			## Running the tests

			Explain how to run the automated tests for this system

			### Break down into end to end tests

			Explain what these tests test and why

			```
			Give an example
			```

			### And coding style tests

			Explain what these tests test and why

			```
			Give an example
			```

			## Deployment

			Add additional notes about how to deploy this on a live system

			## Built With

			* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
			* [Maven](https://maven.apache.org/) - Dependency Management
			* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

			## Contributing

			Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

			## Versioning

			We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

			## Authors

			* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

			See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

			## License

			This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

			## Acknowledgments

			* Hat tip to anyone whose code was used
			* Inspiration
			* etc
-->

FROM amazoncorretto:21.0.1-al2023
VOLUME /tmp
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

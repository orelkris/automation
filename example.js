const { Builder, By, Key, Keys, until } = require('selenium-webdriver');

const url =
  'https://reservation.frontdesksuite.ca/rcfs/cardelrec/Home/Index?Culture=en&PageId=a10d1358-60a7-46b6-b5e9-5b990594b108&ShouldStartReserveTimeFlow=False&ButtonId=00000000-0000-0000-0000-000000000000';

const activity = 'Yoga';

async function example() {
  // launch the browser
  let driver = await new Builder().forBrowser('chrome').build();

  // navigate to our application
  await driver.get(url);

  // add a todo - find textfield
  const elements = await driver.findElements(By.className('content'));

  const elementText = await elements.forEach(async (element) =>
    element.getText().then(async (text) => {
      if (text === activity) {
        element.click();
        setTimeout(async () => {
          try {
            const noAvailability = await driver.findElement(
              By.className('warning-message')
            );

            return console.log('No more available times');
          } catch (e) {
            console.log('');
          }

          try {
            const noAvailability = await driver.findElement(By.id('mainForm'));

            const text = await noAvailability.getText();

            // how to automate going back a page
            // console.log(await driver.navigate().back());

            if (text.trim().toLocaleLowerCase() === 'no more available times') {
              return console.log(text);
            }
          } catch (e) {
            console.log('');
          }
          setTimeout(async () => {
            await driver
              .findElement(By.id('reservationCount'))
              .sendKeys(Key.DELETE, '2', Key.ENTER);

            await driver.findElement(By.className('date one-queue')).click();
            setTimeout(async () => {
              const reserveButton = await driver.findElement(
                By.className('time ampm-format')
              );

              const availableTime = await driver.findElement(
                By.className('mdc-button__label available-time')
              );

              if (availableTime) {
                const text = await availableTime.getText();
                reserveButton.click();

                setTimeout(async () => {
                  await driver
                    .findElement(By.id('telephone'))
                    .sendKeys('647-270-3663');

                  await driver
                    .findElement(By.id('telephone'))
                    .sendKeys('647-270-3663');

                  await driver
                    .findElement(By.id('email'))
                    .sendKeys('krissyorel@hotmail.com');

                  // this element seems to have the id change daily
                  await driver
                    .findElement(By.css("input[id^='field']"))
                    .sendKeys('Kris Orel');

                  const submit = await driver.findElement(By.id('submit-btn'));

                  console.log(await submit.getText());

                  // submit.click();
                }, 0);
              }
            }, 0);
          }, 0);
        }, 1400);
      }
    })
  );

  console.log(elementText);
}

example();

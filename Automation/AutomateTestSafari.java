import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.safari.SafariDriver;

public class AutomateTestSafari {
    private WebDriver driver;

    public AutomateTestSafari() {
        driver = new SafariDriver();
    }

    public void closeDriver() {
        driver.quit();
    }
    
    //Login page
    public void testLogin(String userName, String password) {
        System.out.println("-----------------------------");
        System.out.println("|    Testing login Page     |");
        System.out.println("-----------------------------");

        try {
            driver.get("http://localhost:3000/");
            Thread.sleep(2000);
            WebElement userNameField = driver.findElement(By.cssSelector("input[type='text']"));
            userNameField.sendKeys(userName);

            WebElement passwordField = driver.findElement(By.cssSelector("input[type='password']"));
            passwordField.sendKeys(password);

            WebElement form = driver.findElement(By.tagName("form"));
            form.submit();

            System.out.println("Button Clicked");
            Thread.sleep(2000);
            try {
                WebElement homeScreenElement = driver.findElement(By.className("sidebar"));
                if(homeScreenElement.isDisplayed()) {
                    System.out.println("Login Success!");
                } else {
                    System.out.println("Login failed!!");
                }

            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Logout button
    public void logoutButton() {
        System.out.println("-----------------------------");
        System.out.println("|    Testing Logout option  |");
        System.out.println("-----------------------------");

        try {
            WebElement button = driver.findElement(By.xpath("//button[text()='Logout']"));
        button.click();

        Thread.sleep(3000);
        System.out.println("Logout Successfull");
        } catch (Exception e) {
            System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Flip cards automation retrives the value of BMI and displays it
    //If it fails to fetch it then the test case is failed
    public void getFlipCardValue() {
        System.out.println("-----------------------------");
        System.out.println("|    Testing Flip Card      |");
        System.out.println("-----------------------------");
        System.out.println("Currently at Homepage: "+driver.getCurrentUrl());
        try {
            WebElement card = driver.findElement(By.className("card"));
            card.click();
            Thread.sleep(3000);
            WebElement cardText = driver.findElement(By.xpath("//div[@class='card']/h2"));
            String textContent = cardText.getText();

            System.out.println("Current text on the card after flip: " + textContent);
        } catch (Exception e) {
            System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Navigate to "/profile page"
    public void navigateToUserProfile() {
        System.out.println("--------------------------------------------");
        System.out.println("|    Testing Navigation to user profile    |");
        System.out.println("--------------------------------------------");
        try {
        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: "+currentUrl);
        WebElement profileButton = driver.findElement(By.className("Profile"));
        profileButton.click();
        Thread.sleep(3000);
        String changedUrl = driver.getCurrentUrl();
        System.out.println("Navigated to : "+changedUrl);
    } catch (Exception e) {
        System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Navigate to "/stats page"
    public void navigateToStats() {
        System.out.println("--------------------------------------------");
        System.out.println("|     Testing Navigation to Stats Page     |");
        System.out.println("--------------------------------------------");
        try {
        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: "+currentUrl);
        WebElement statsButton = driver.findElement(By.className("Statistics"));
        statsButton.click();
        Thread.sleep(3000);
        String changedUrl = driver.getCurrentUrl();
        System.out.println("Navigated to : "+changedUrl);
    } catch (Exception e) {
        System.out.println("Test Failed: " + e.getMessage());
        }
    }

    // Display stats
    public void displayStats() {
        System.out.println("----------------------------------------");
        System.out.println("|     Display of stats in progress     |");
        System.out.println("----------------------------------------");
        try {
            WebElement viewStatsBtn = driver.findElement(By.className("display_stats"));
            viewStatsBtn.click();
            Thread.sleep(3000);
            System.out.println(":::Stats are being displayed:::");
        } catch (Exception e) {
            System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Navigate to "/details page"
    public void navigateToDetails() {
        System.out.println("--------------------------------------------");
        System.out.println("|    Testing Navigation to Details Page    |");
        System.out.println("--------------------------------------------");
        try {
        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: "+currentUrl);
        WebElement detailsButton = driver.findElement(By.className("Details"));
        detailsButton.click();
        Thread.sleep(3000);
        String changedUrl = driver.getCurrentUrl();
        System.out.println("Navigated to : "+changedUrl);
    } catch (Exception e) {
        System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Navigate to "/Workout page"
    public void navigateToWorkOut() {
        System.out.println("--------------------------------------------");
        System.out.println("|    Testing Navigation to WorkOut Page    |");
        System.out.println("--------------------------------------------");
        try {
        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: "+currentUrl);
        WebElement workOutPageButton = driver.findElement(By.className("WorkOut"));
        workOutPageButton.click();
        Thread.sleep(2000);
        WebElement getHistoryBtn = driver.findElement(By.className("get_history"));
        getHistoryBtn.click();
        Thread.sleep(3000);
        String changedUrl = driver.getCurrentUrl();
        System.out.println("Navigated to : "+changedUrl);
    } catch (Exception e) {
        System.out.println("Test Failed: " + e.getMessage());
        }
    }

    //Forgot password 
    public void forgotPasswordButton() {
        System.out.println("--------------------------------------------");
        System.out.println("|     Testing Forgot password function     |");
        System.out.println("--------------------------------------------");
        try {
        driver.get("http://localhost:3000/");
        WebElement forgotPasswordLink = driver.findElement(By.xpath("//span[text()='Forgot Password?']"));
        forgotPasswordLink.click();
        Thread.sleep(3000);
        System.out.println("Test Passed");
        } catch (Exception e) {
            System.out.println("Test Failed: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        AutomateTestSafari lt = new AutomateTestSafari();
        lt.testLogin("bob@mavs.edu", "admin");
        lt.getFlipCardValue();
        lt.navigateToUserProfile();
        lt.navigateToStats();
        lt.displayStats();
        lt.navigateToDetails();
        lt.navigateToWorkOut();
        lt.logoutButton();
        lt.forgotPasswordButton();
        lt.closeDriver();
    }
}
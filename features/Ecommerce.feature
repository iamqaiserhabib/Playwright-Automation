Feature: Ecommerce Validations

    Scenario Outline: Placing the order
        Given Login to ecommerce application with "<username>" and "<password>"
        When Add "zara coat 3" to cart
        Then Verify "zara coat 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in the orderHistory

        Examples:
            | username           | password     |
            | anshika@gmail.com  | Iamking@000  |
from django.db import models

class Expense(models.Model):
    CATEGORIES = [
        ('Food', 'Food'),
        ('Transit', 'Transit'),
        ('Bills', 'Bills'),
        ('Miscellaneous', 'Miscellaneous'),
    ]

    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORIES)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - ${self.amount}"
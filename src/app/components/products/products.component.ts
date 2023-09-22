import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/Models/category';
import { Product } from 'src/Models/product';
import { ProductsService } from 'src/services/products.service';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  category: Category = {} as Category;
  productId?: string | null;
  productsObj = {} as any;
  productList: Product[] = [];
  checkString = /^[a-z A-Z - () ا-ي آ-ی]{3}[ 0-9 a-z A-Z ا-ي آ-ی]{1,100}$/;
  checkNumber = /^[0-9]{1,6}$/;
  checkString2 = /(?:[0-9a-z  ا-ي آ-ی]{5,},)+/i;
  checkObjStr = /^[a-zA-Z, 0-9]+:[a-zA-Z, 0-9]+$/i;
  categoryIdReg = /^[0-9a-z]{10,}$/i;
  productForm!: FormGroup;
  product!: Product;
  constructor(
    private productServices: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.productForm = new FormGroup({
      quantity: new FormControl('', [Validators.pattern(this.checkNumber)]),
      title_en: new FormControl('', [Validators.required]),
      title_ar: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      oldPrice: new FormControl('', [Validators.pattern(this.checkNumber)]),
      newPrice: new FormControl('', [
        Validators.required,
        Validators.pattern(this.checkNumber),
      ]),
      discount: new FormControl('', [Validators.pattern(this.checkNumber)]),

      shipping: new FormControl('', [Validators.pattern(this.checkNumber)]),
      info_en: new FormControl(''),
      info_ar: new FormControl(''),
      aboutItem_en: new FormControl('', [
        Validators.pattern(this.checkString2),
      ]),
      aboutItem_ar: new FormControl('', [
        Validators.pattern(this.checkString2),
      ]),
      categoryId: new FormControl('', [
        Validators.required,
        Validators.pattern(this.categoryIdReg),
      ]),
    });
  }
  ngOnInit(): void {
    this.productServices.getAllProducts().subscribe((data) => {
      this.productsObj = data;
      this.productList = this.productsObj.data;
    });
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.productId = paramMap.get('id') ? paramMap.get('id') : '';
      this.productServices.getProductById(this.productId).subscribe((data) => {
        let prodObj: any = data;
        this.product = prodObj.data;
        let info_en = this.product.info_en?.join(',');
        let info_ar = this.product.info_ar?.join(',');
        let aboutItem_en = this.product.aboutItem_en?.join(',');
        let aboutItem_ar = this.product.aboutItem_ar?.join(',');
        this.productForm.patchValue({
          quantity: this.product.quantity || '',
          title_en: this.product.title_en || '',
          title_ar: this.product.title_ar || '',
          img: this.product.img || '',
          oldPrice: this.product.price?.old || '',
          newPrice: this.product.price?.new || '',
          discount: this.product.price?.discount || '',
          shipping: this.product.price?.shipping || '',
          info_en: this.product.info_en || '',
          info_ar: this.product.info_ar || '',
          aboutItem_en: this.product.aboutItem_en || '',
          aboutItem_ar: this.product.aboutItem_ar || '',
          categoryId: this.product.categoryId || '',
        });
      });
    });
  }
  get title_en() {
    return this.productForm.get('title_en');
  }
  get title_ar() {
    return this.productForm.get('title_ar');
  }

  get img() {
    return this.productForm.get('img');
  }

  get oldPrice() {
    return this.productForm.get('oldPrice');
  }

  get newPrice() {
    return this.productForm.get('newPrice');
  }

  get discount() {
    return this.productForm.get('discount');
  }

  get shipping() {
    return this.productForm.get('shipping');
  }

  get info_en() {
    return this.productForm.get('info_en');
  }

  get info_ar() {
    return this.productForm.get('info_ar');
  }

  get aboutItem_en() {
    return this.productForm.get('aboutItem_en');
  }

  get aboutItem_ar() {
    return this.productForm.get('aboutItem_ar');
  }

  get categoryId() {
    return this.productForm.get('categoryId');
  }
  get quantity() {
    return this.productForm.get('quantity');
  }
  getCategoryInProgress: boolean = false;

  getCategory() {
    if (this.getCategoryInProgress) {
      return;
    }
    let catData: any;
    let allCategories = [] as any;
    this.categoryService.getAllCategory().subscribe((data) => {
      catData = data;
      allCategories = catData.data;
      let foundCategory = allCategories.find(
        (category: { _id: any }) => category._id == this.categoryId?.value
      );
      if (foundCategory) {
        try {
          this.getCategoryInProgress = true;
          this.categoryService
            .getCategoryById(this.categoryId?.value)
            .subscribe((data) => {
              this.category = data.data;

              this.onSubmit();
              this.getCategoryInProgress = false;
            });
        } catch (err) {
          alert(`Error Fetching category ${err}`);
          this.getCategoryInProgress = false;
        }
      } else {
        alert('Enter a valid category id');
        this.getCategoryInProgress = false;
      }
    });
  }

  onSubmit() {
    this.getCategory();
    if (!this.productId) {
      const infoInputEn = this.info_en?.value
        ? this.info_en?.value.split(',').filter(Boolean)
        : '';
      let notMatched = infoInputEn
        ? infoInputEn.find((item: string) => {
            return !item.match(this.checkObjStr);
          })
        : false;
      if (notMatched) {
        alert('Enter a valid structure for info En');
        return;
      }
      const infoInputAr = this.info_ar?.value
        ? this.info_ar?.value.split(',').filter(Boolean)
        : '';
      // let notMatchedAr = infoInputAr
      //   ? infoInputAr.find((item: string) => {
      //       return !item.match(this.checkObjStr);
      //     })
      //   : false;
      // if (notMatchedAr) {
      //   alert('Enter a valid structure for info AR');
      //   return;
      // }
      let enAboutItem = this.aboutItem_en?.value.split(',').filter(Boolean);
      let arAboutItem = this.aboutItem_ar?.value.split(',').filter(Boolean);

      if (this.productForm.valid) {
        const product: Product = {
          quantity: this.quantity?.value,
          title_en: this.title_en?.value,
          title_ar: this.title_ar?.value,
          img: this.img?.value,
          price: {
            old: this.oldPrice?.value,
            new: this.newPrice?.value,
            discount: this.discount?.value,
            shipping: this.shipping?.value,
          },
          info_en: infoInputEn,
          info_ar: infoInputAr,
          aboutItem_en: enAboutItem,
          aboutItem_ar: arAboutItem,
          categoryId: {
            _id: this.categoryId?.value,
            name_en: this.category.name_en,
            name_ar: this.category.name_ar,
          },
        };
        this.productServices.addProducts(product).subscribe(() => {
          this.productServices.getAllProducts().subscribe((data) => {
            this.productsObj = data;
            this.productList = this.productsObj.data;
          });
        });
        this.quantity?.setValue('');
        this.title_en?.setValue('');
        this.title_ar?.setValue('');
        this.img?.setValue('');
        this.oldPrice?.setValue('');
        this.newPrice?.setValue('');
        this.discount?.setValue('');
        this.shipping?.setValue('');
        this.info_en?.setValue('');
        this.info_ar?.setValue('');
        this.aboutItem_en?.setValue('');
        this.aboutItem_ar?.setValue('');
        this.categoryId?.setValue('');
      } else {
        alert('Enter valid values');
      }
    } else {
      console.log(this.info_en?.value);
      let infoEn = this.product.info_en?.map((info) => info).join(',');
      const infoInputEn =
        infoEn?.split(',').filter(Boolean) || this.info_en?.value
          ? this.info_en?.value
          : [];

      let infoAr = this.product.info_ar?.map((info) => info).join(',');
      const infoInputAr =
        infoAr?.split(',').filter(Boolean) || this.info_ar?.value
          ? this.info_ar?.value
          : [];
      console.log(this.info_ar?.value);

      let enAboutItem = this.product.aboutItem_en
        ?.map((info) => info)
        .join(',');
      const enAboutItemArr =
        enAboutItem?.split(',').filter(Boolean) || this.aboutItem_en?.value
          ? this.aboutItem_en?.value
          : [];

      let arAboutItem = this.product.aboutItem_ar
        ?.map((info) => info)
        .join(',');
      const ArAboutItemArr =
        arAboutItem?.split(',').filter(Boolean) || this.aboutItem_ar?.value
          ? this.aboutItem_ar?.value
          : [];

      const product: Product = {
        _id: this.productId,
        quantity: this.quantity?.value,
        title_en: this.title_en?.value,
        title_ar: this.title_ar?.value,
        img: this.img?.value,
        price: {
          old: this.oldPrice?.value,
          new: this.newPrice?.value,
          discount: this.discount?.value,
          shipping: this.shipping?.value,
        },
        info_en: infoInputEn,
        info_ar: infoInputAr,
        aboutItem_en: enAboutItemArr,
        aboutItem_ar: ArAboutItemArr,
        categoryId: {
          _id: this.categoryId?.value,
          name_en: this.category.name_en,
          name_ar: this.category.name_ar,
        },
      };

      this.productServices.updateProducts(product).subscribe(() => {
        this.productServices.getAllProducts().subscribe((data) => {
          this.productsObj = data;
          this.productList = this.productsObj.data;
        });
      });
      this.router.navigate(['products']);
    }
  }
  update(product: Product) {
    this.router.navigate(['products', product._id]);
  }
  delete(product: Product) {
    this.productServices.deleteProducts(product).subscribe(() => {
      this.productList = this.productList.filter(
        (prod) => prod._id !== product._id
      );
    });
  }
  language: string = 'en';
  changLanguage() {
    this.language = this.language == 'en' ? 'arabic' : 'en';
  }
}

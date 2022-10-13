from django.core import paginator
from django.shortcuts import render
from rest_framework import response, serializers

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):

    query= request.query_params.get('keyword')
    if query == None:
        query = ''

    page = request.query_params.get('page')

    category= request.query_params.get('cat')
    if category == None:
        category = ''
    
    brand= request.query_params.get('brand')
    if brand == None:
        brand = ''

    sortBy= request.query_params.get('sortBy')
    if sortBy == None:
        sortBy = ''

    orderBy= request.query_params.get('orderBy')
    if orderBy == None:
        orderBy = ''
    


    products = Product.objects.filter(name__icontains= query)
    if(category != ''):
        products = products.filter(category = category) 
    if(brand != ''):
        products = products.filter(brand = brand) 
    if(sortBy != ''):
        if(sortBy == 'ID'):
            if(orderBy == 'Descending'):
                products = products.order_by('-_id')
            else:
                products = products.order_by('_id')
        elif(sortBy == 'NAME'):
            if(orderBy == 'Descending'):
                products = products.order_by('-name')
            else:
                products = products.order_by('name')
        elif(sortBy == 'PRICE'):
            if(orderBy == 'Descending'):
                products = products.order_by('-price')
            else:
                products = products.order_by('price')
        elif(sortBy == 'CATEGORY'):
            if(orderBy == 'Descending'):
                products = products.order_by('-category')
            else:
                products = products.order_by('category')
        elif(sortBy == 'BRAND'):
            if(orderBy == 'Descending'):
                products = products.order_by('-brand')
            else:
                products = products.order_by('brand')



    allProducts = Product.objects.all()
    featuredProducts = allProducts.filter(isFeatured= True)

    paginator = Paginator(products, 8)
    # TODO allow user to change number of displayed items per page 
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
   
    serializer = ProductSerializer(products, many=True)
    allProductsSerializer = ProductSerializer(allProducts, many=True)
    featuredProductsSerializer = ProductSerializer(featuredProducts, many=True)
    ###
    catAndBrand ={}
    
    for i in allProductsSerializer.data:
        if i['category'] not in catAndBrand:
            catAndBrand[i['category']]=[]
            catAndBrand[i['category']].append(i['brand'])
        if i['category'] in catAndBrand:
            if i['brand'] not in catAndBrand[i['category']]:
                catAndBrand[i['category']].append(i['brand'])


    ###

    return Response({'products':serializer.data,'featuredProducts':featuredProductsSerializer.data, 'page': page, 'pages': paginator.num_pages, 'catAndBrand' : catAndBrand})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name="some name",
        price=0,
        brand="some brand",
        countInStock=0,
        category="some category",
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response("product deleted")


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('image uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

   
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

   
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')

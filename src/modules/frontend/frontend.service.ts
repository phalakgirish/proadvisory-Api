import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Property } from '../property/property.schema';
const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class FrontendService {
    constructor(
        @InjectModel(Property.name)
        private propertyModel:mongoose.Model<Property>
    ){}

    async getPropertyDetails(searchObject:any):Promise<any>{

        const search:any = JSON.parse(searchObject)
        
        var searchInventory:any = {}

        if(search.inventory != "")
        {
            searchInventory = {"propertyInventoryId.inventory":search.inventory}
        }

        var searchAminities:any = {}
        if(search.amenities.length > 0)
        {
            searchAminities = {amenities:{$in:search.amenities}}
        }
        var searchArea:any = {}
        if(search.area != "")
        {
            searchArea = {area:search.area}
        }

        var searchPrice:any = {}
        if(search.minPrice != 0 && search.maxPrice != 0)
        {
           searchPrice = {$or:[
              {minPrice:{"$gte": search.minPrice,"$lte": search.maxPrice}},
              {maxPrice:{"$gte": search.minPrice,"$lte": search.maxPrice}}
            ]}
        }

        var searchStatus:any = {}
        if(search.status.length > 0)
        {
            searchStatus = {property_status:{$in:search.status}}
        }

        var query:any = {$and:[searchInventory,searchArea,searchStatus,searchAminities,searchPrice]}


        var propertyDts = await this.propertyModel.aggregate([
            {
                $addFields: {
                    cityId: { $toObjectId: "$city" }  // Convert categoryId from String to ObjectId
                }
            },
            {
                $addFields: {
                    areaId: { $toObjectId: "$area" }  // Convert categoryId from String to ObjectId
                }
            },
            {
                $addFields: {
                    propertyTypeId: { $toObjectId: "$propertyType" }  // Convert categoryId from String to ObjectId
                }
            },
            {
                $addFields: {
                    propertySubtypeId: { $toObjectId: "$propertySubtype" }  // Convert categoryId from String to ObjectId
                }
            },
            {
                $addFields: {
                    amenitiesId: {
                    $map: {
                      input: "$amenities",
                      as: "id",
                      in: { $toObjectId: "$$id" } // Convert string IDs to ObjectId
                    }
                  }
                }
              },
            {
                $lookup: {
                    from: "cities",
                    localField: "cityId",
                    foreignField: "_id",
                    as: 'cityId'
                }
            },
            {
                $lookup: {
                    from: "areas",
                    localField: "areaId",
                    foreignField: "_id",
                    as: 'areaId'
                }
            },
            {
                $lookup: {
                    from: "propertytypes",
                    localField: "propertyTypeId",
                    foreignField: "_id",
                    as: 'propertyTypeId'
                }
            },
            {
                $lookup: {
                    from: "propertysubtypes",
                    localField: "propertySubtypeId",
                    foreignField: "_id",
                    as: 'propertySubtypeId'
                }
            },
            {
                $lookup: {
                  from: "amenities",
                  localField: "amenitiesId",
                  foreignField: "_id",
                  as: "amenitiesId"
                }
            },
            {
                $lookup: {
                  from: "propertyinventories",
                  let: { propertyId: "$_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: [ { $toObjectId: "$property" }, "$$propertyId" ] // Convert `buildingId` string to ObjectId
                        }
                      }
                    }
                  ],
                  as: "propertyInventoryId"
                }
            },
            {
                $unwind: {
                  path: "$propertyInventoryId",
                  preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                  from: "inventories",
                  let: { inventoryid: "$propertyInventoryId.inventory" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: [ "$_id" , {$toObjectId: "$$inventoryid"} ] // Convert `buildingId` string to ObjectId
                        }
                      }
                    }
                  ],
                  as: "propertyInventoryId.inventoryId"
                }
            },
            {
                $unwind: {
                  path: "$propertyInventoryId.inventoryId",
                  preserveNullAndEmptyArrays: true
                }
            },
            {
                $match:query
            },
            {
                $group: {
                  _id: "$_id",
                  propertyName: {$first:"$propertyName"},
                  reraNumber: {$first:"$reraNumber"},
                  cityId: {$first:{ $arrayElemAt: ["$cityId", 0]}},
                  areaId: {$first:{ $arrayElemAt: ["$areaId", 0]}},
                  propertyTypeId: {$first:{ $arrayElemAt: ["$propertyTypeId", 0]}},
                  propertySubtypeId: {$first:{ $arrayElemAt: ["$propertySubtypeId", 0]}},            
                  noOfBeds:{$first:"$noOfBeds"},
                  carpetArea:{$first:"$carpetArea"},
                  floor:{$first:"$floor"},
                  amenitiesId:{$first:"$amenitiesId"},
                  possessionDate:{$first:"$possessionDate"},
                  propertyImages:{$first:"$propertyImages"},
                  minPrice:{$first: "$minPrice" },
                  maxPrice:{$first: "$maxPrice" },
                  maplink:{$first:"$maplink"},
                  description:{$first:"$description"},
                  property_status:{$first:"$property_status"},
                  createdAt:{$first:"$createdAt"},
                  pincode:{$first:"$pincode"},
                  propertyInventoryId: { $push: "$propertyInventoryId" }
                }
            }
            // {$match:{}}

        ]);

        return propertyDts;
    }

    async getPropertyDetailsById(id:any):Promise<any>{
        

        var propertyDts = await this.propertyModel.aggregate([
          {
              $addFields: {
                  cityId: { $toObjectId: "$city" }  // Convert categoryId from String to ObjectId
              }
          },
          {
              $addFields: {
                  areaId: { $toObjectId: "$area" }  // Convert categoryId from String to ObjectId
              }
          },
          {
              $addFields: {
                  propertyTypeId: { $toObjectId: "$propertyType" }  // Convert categoryId from String to ObjectId
              }
          },
          {
              $addFields: {
                  propertySubtypeId: { $toObjectId: "$propertySubtype" }  // Convert categoryId from String to ObjectId
              }
          },
          {
              $addFields: {
                  amenitiesId: {
                  $map: {
                    input: "$amenities",
                    as: "id",
                    in: { $toObjectId: "$$id" } // Convert string IDs to ObjectId
                  }
                }
              }
            },
          {
              $lookup: {
                  from: "cities",
                  localField: "cityId",
                  foreignField: "_id",
                  as: 'cityId'
              }
          },
          {
              $lookup: {
                  from: "areas",
                  localField: "areaId",
                  foreignField: "_id",
                  as: 'areaId'
              }
          },
          {
              $lookup: {
                  from: "propertytypes",
                  localField: "propertyTypeId",
                  foreignField: "_id",
                  as: 'propertyTypeId'
              }
          },
          {
              $lookup: {
                  from: "propertysubtypes",
                  localField: "propertySubtypeId",
                  foreignField: "_id",
                  as: 'propertySubtypeId'
              }
          },
          {
              $lookup: {
                from: "amenities",
                localField: "amenitiesId",
                foreignField: "_id",
                as: "amenitiesId"
              }
          },
          {
              $lookup: {
                from: "propertyinventories",
                let: { propertyId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: [ { $toObjectId: "$property" }, "$$propertyId" ] // Convert `buildingId` string to ObjectId
                      }
                    }
                  }
                ],
                as: "propertyInventoryId"
              }
          },
          {
              $unwind: {
                path: "$propertyInventoryId",
                preserveNullAndEmptyArrays: true
              }
          },
          {
              $lookup: {
                from: "inventories",
                let: { inventoryid: "$propertyInventoryId.inventory" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: [ "$_id" , {$toObjectId: "$$inventoryid"} ] // Convert `buildingId` string to ObjectId
                      }
                    }
                  }
                ],
                as: "propertyInventoryId.inventoryId"
              }
          },
          {
              $unwind: {
                path: "$propertyInventoryId.inventoryId",
                preserveNullAndEmptyArrays: true
              }
          },
          {
              $match:{_id:new ObjectId(id)}
          },
          {
              $group: {
                _id: "$_id",
                propertyName: {$first:"$propertyName"},
                reraNumber: {$first:"$reraNumber"},
                cityId: {$first:{ $arrayElemAt: ["$cityId", 0]}},
                areaId: {$first:{ $arrayElemAt: ["$areaId", 0]}},
                propertyTypeId: {$first:{ $arrayElemAt: ["$propertyTypeId", 0]}},
                propertySubtypeId: {$first:{ $arrayElemAt: ["$propertySubtypeId", 0]}},            
                noOfBeds:{$first:"$noOfBeds"},
                carpetArea:{$first:"$carpetArea"},
                floor:{$first:"$floor"},
                amenitiesId:{$first:"$amenitiesId"},
                possessionDate:{$first:"$possessionDate"},
                propertyImages:{$first:"$propertyImages"},
                minPrice:{$first: "$minPrice" },
                maxPrice:{$first: "$maxPrice" },
                maplink:{$first:"$maplink"},
                description:{$first:"$description"},
                property_status:{$first:"$property_status"},
                createdAt:{$first:"$createdAt"},
                pincode:{$first:"$pincode"},
                propertyInventoryId: { $push: "$propertyInventoryId" }
              }
          }
          // {$match:{}}

      ]);

        return propertyDts;
    }
    
}

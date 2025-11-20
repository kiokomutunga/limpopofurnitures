import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, User } from 'lucide-react';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Review {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  verifiedPurchase?: boolean;
  hidden?: boolean;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  numReviews: number;
  averageRating: number;
  onReviewAdded: (newReviews: Review[]) => void;
}

const ProductReviews = ({ 
  productId, 
  reviews, 
  numReviews, 
  averageRating, 
  onReviewAdded 
}: ProductReviewsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please add a comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await api.addProductReview(productId, {
        rating,
        comment: comment.trim()
      });

      if (response.success) {
        onReviewAdded(response.reviews);
        setRating(0);
        setComment('');
        setShowAddReview(false);
        toast({
          title: "Review Added Successfully!",
          description: "Thank you for your feedback. Your review has been posted.",
        });
      } else {
        toast({
          title: "Failed to Add Review",
          description: response.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Network Error",
        description: "Failed to submit review. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (interactive ? hoveredRating || rating : rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const visibleReviews = reviews.filter(review => !review.hidden);
  const hasUserReviewed = user && reviews.some(review => review.user === user.id);

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span>Customer Reviews</span>
            <Badge variant="secondary">
              {numReviews} review{numReviews !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">out of 5</span>
            </div>
          </div>

          {/* Add Review Button */}
          {user && !hasUserReviewed && (
            <Button 
              onClick={() => setShowAddReview(!showAddReview)}
              className="mb-4"
            >
              Write a Review
            </Button>
          )}

          {user && hasUserReviewed && (
            <p className="text-sm text-muted-foreground mb-4">
              You have already reviewed this product.
            </p>
          )}

          {!user && (
            <p className="text-sm text-muted-foreground mb-4">
              Please <Button variant="link" className="p-0 h-auto text-sm">login</Button> to write a review.
            </p>
          )}

          {/* Add Review Form */}
          {showAddReview && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    {renderStars(rating, true, setRating)}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowAddReview(false);
                        setRating(0);
                        setComment('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      {visibleReviews.length > 0 ? (
        <div className="space-y-4">
          {visibleReviews.map((review) => (
            <Card key={review._id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.name}</span>
                      {review.verifiedPurchase && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductReviews;
